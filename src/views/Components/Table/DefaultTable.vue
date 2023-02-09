<script setup lang="ts">
// 页面容器
import { ContentWrap } from '@/components/ContentWrap'
// 二次封装table组件
import { Table } from '@/components/Table'
// 接口api地址
import { getTableListApi } from '@/api/table'
// 列表数据type类型
import { TableData } from '@/api/table/types'
// h用于render方式创建template
import { h, ref } from 'vue'
import { ElTag, ElButton } from 'element-plus'
// 二次封装表格列字段type类型, 二次封装表格插槽字段类型
import { TableColumn, TableSlotDefault } from '@/types/table'
import { localesFn, cellConfigEnum } from '@/views/Components/Table/config'

// 接口参数type
interface Params {
  pageIndex?: number
  pageSize?: number
}

const columns: TableColumn[] = [
  {
    field: 'index',
    label: localesFn('index'),
    type: 'index'
  },
  {
    field: 'title',
    label: localesFn('title')
  },
  {
    field: 'author',
    label: localesFn('author')
  },
  {
    field: 'display_time',
    label: localesFn('displayTime'),
    sortable: true
  },
  {
    field: 'importance',
    label: localesFn('importance'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        { type: cellConfigEnum[cellValue].type },
        () => cellConfigEnum[cellValue].text
      )
    }
  },
  {
    field: 'pageviews',
    label: localesFn('pageviews')
  },
  {
    field: 'action',
    label: localesFn('action')
  }
]

const loading = ref(true)
// 列表数据
const tableDataList = ref<TableData[]>([])

/**
 * @method 获取列表数据
 * @param params
 */
const getTableList = async (params?: Params) => {
  const res = await getTableListApi(
    params || {
      pageIndex: 1,
      pageSize: 10
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.data.list
  }
}

getTableList()

const actionFn = (data: TableSlotDefault) => {
  console.log(data, '当前行数据')
}
</script>
<template>
  <ContentWrap :title="localesFn('title')" :message="localesFn('tableDes')">
    <Table
      :columns="columns"
      :data="tableDataList"
      :loading="loading"
      :defaultSort="{ prop: 'display_time', order: 'descending' }"
    >
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data)">
          {{ localesFn('action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
