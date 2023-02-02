<!-- 密码强度组件封装 -->
<script setup lang="ts">
import { computed, unref, ref, watch } from 'vue'
import { ElInput } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { useConfigGlobal } from '@/hooks/web/useConfigGlobal'
import { propTypes } from '@/utils/propTypes'
import type { ZxcvbnResult } from '@zxcvbn-ts/core'
import { zxcvbn } from '@zxcvbn-ts/core'

const { getPrefixCls } = useDesign()

const { configGlobal } = useConfigGlobal()

const prefixCls = getPrefixCls('input-password')

const props = defineProps({
  // 是否显示密码强度
  strength: propTypes.bool.def(false),
  modelValue: propTypes.string.def('')
})

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

const emit = defineEmits(['update:modelValue'])

const textType = ref<'password' | 'text'>('password')

const getIconName = computed(() =>
  unref(textType) === 'password' ? 'ant-design:eye-invisible-outlined' : 'ant-design:eye-outlined'
)

// 获取密码强度
const getPasswordStrength = computed(() => {
  const value = unref(valueRef)
  const zxcvbnRef = zxcvbn(unref(valueRef)) as ZxcvbnResult
  return value ? zxcvbnRef.score : -1
})

/**
 * 修改密码输入框类型
 */
const changeTextType = () => {
  textType.value = unref(textType) === 'text' ? 'password' : 'text'
}

// 输入框的值
const valueRef = ref(props.modelValue)
// 监听
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)
</script>

<template>
  <div :class="[prefixCls, `${prefixCls}--${configGlobal.size}`]">
    <ElInput v-bind="$attrs" v-model="valueRef" :type="textType">
      <template #suffix>
        <Icon class="el0input__icon cursor-pointer" :icon="getIconName" @click="changeTextType" />
      </template>
    </ElInput>
    <div
      v-if="strength"
      :class="`${prefixCls}__bar`"
      class="relative h-6px mt-10px mb-6px mr-auto ml-auto"
    >
      <div :class="`${prefixCls}__bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-input-password';

.@{prefix-cls} {
  :deep(.@{elNamespace}-input__clear) {
    margin-left: 5px;
  }

  &__bar {
    background-color: var(--el-text-color-disabled);
    border-radius: var(--el-border-radius-base);

    &::before,
    &::after {
      position: absolute;
      z-index: 10;
      display: block;
      width: 20%;
      height: inherit;
      background-color: transparent;
      border-color: var(--el-color-white);
      border-style: solid;
      border-width: 0 5px 0 5px;
      content: '';
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }

    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      background-color: transparent;
      border-radius: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;

      &[data-score='0'] {
        width: 20%;
        background-color: var(--el-color-danger);
      }

      &[data-score='1'] {
        width: 40%;
        background-color: var(--el-color-danger);
      }

      &[data-score='2'] {
        width: 60%;
        background-color: var(--el-color-warning);
      }

      &[data-score='3'] {
        width: 80%;
        background-color: var(--el-color-success);
      }

      &[data-score='4'] {
        width: 100%;
        background-color: var(--el-color-success);
      }
    }
  }

  &--mini > &__bar {
    border-radius: var(--el-border-radius-small);
  }
}
</style>
