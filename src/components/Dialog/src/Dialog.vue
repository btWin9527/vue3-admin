<!--
 Dialog组件
 （二次封装el-dialog组件，内容区使用el-scroll支持超出滚动显示）

Dialog 属性
除以下参数外，还支持 element-plus 的 Dialog 所有属性，详见

属性	说明	类型	可选值	默认值
modelValue	是否显示弹窗，支持v-model	boolean	-	false
fullscreen	是否显示全屏按钮	boolean	-	true
title	弹窗标题	string	-	Dialog
maxHeight	弹窗内容最大高度	string/number	-	500px

Dialog 插槽
插槽名	说明	子标签
-	弹窗内容	-
title	弹窗标题内容	-
footer	弹窗底部内容	-
 -->
<script setup lang="ts">
import { ElDialog, ElScrollbar } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { computed, useAttrs, ref, unref, useSlots, watch, nextTick } from 'vue'
import { isNumber } from '@/utils/is'

const slots = useSlots()

const props = defineProps({
  modelValue: propTypes.bool.def(false),
  title: propTypes.string.def('Dialog'),
  fullscreen: propTypes.bool.def(true),
  maxHeight: propTypes.oneOfType([String, Number]).def('400px')
})

const getBindValue = computed(() => {
  const delArr: string[] = ['fullscreen', 'title', 'maxHeight']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})

const isFullscreen = ref(false)

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

const dialogHeight = ref(isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight)

watch(
  () => isFullscreen.value,
  async (val: boolean) => {
    await nextTick()
    if (val) {
      const windowHeight = document.documentElement.offsetHeight
      dialogHeight.value = `${windowHeight - 55 - 60 - (slots.footer ? 63 : 0)}px`
    } else {
      dialogHeight.value = isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight
    }
  },
  {
    immediate: true
  }
)

const dialogStyle = computed(() => {
  return {
    height: unref(dialogHeight)
  }
})
</script>

<template>
  <ElDialog
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    top="0"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header="{ close }">
      <div class="flex justify-between items-center h-54px pl-15px pr-15px relative">
        <slot name="title">
          {{ title }}
        </slot>
        <div
          class="h-54px flex justify-between items-center absolute top-[50%] right-15px translate-y-[-50%]"
        >
          <Icon
            v-if="fullscreen"
            class="cursor-pointer is-hover !h-54px mr-10px"
            :icon="isFullscreen ? 'radix-icons:exit-full-screen' : 'radix-icons:enter-full-screen'"
            color="var(--el-color-info)"
            hover-color="var(--el-color-primary)"
            @click="toggleFull"
          />
          <Icon
            class="cursor-pointer is-hover !h-54px"
            icon="ep:close"
            hover-color="var(--el-color-primary)"
            color="var(--el-color-info)"
            @click="close"
          />
        </div>
      </div>
    </template>

    <ElScrollbar :style="dialogStyle">
      <slot></slot>
    </ElScrollbar>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<style lang="less">
.@{elNamespace}-overlay-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.@{elNamespace}-dialog {
  margin: 0 !important;

  &__header {
    height: 54px;
    padding: 0;
    margin-right: 0 !important;
    border-bottom: 1px solid var(--el-border-color);
  }

  &__body {
    padding: 15px !important;
  }

  &__footer {
    border-top: 1px solid var(--el-border-color);
  }

  &__headerbtn {
    top: 0;
  }
}
</style>
