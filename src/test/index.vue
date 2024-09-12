<template>
  <div class="table-page">
    <!-- 头部 -->
    <jy-title level="1">{{$t('index_1')}}</jy-title>
    <!-- 搜索 -->
    <search-show-hidden
      style="margin: 20px auto;"
      :isShowDate="false"
      :echoForm="echoForm"
      @handleReset="handleReset"
      @handleSearch="handleSearch"
      @getOrg="getOrg"
    >
      <template #right>
        <el-form-item :label="$t('index_2')">
          <el-input
            @keyup.enter.native="handleSearch"
            class="filter-item"
            :placeholder="$t('index_3')"
            v-model="listQuery.riskPoint"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('index_4')">
          <el-select
            v-model="listQuery.riskPointTypeId"
            clearable
            :placeholder="$t('index_5')"
          >
            <el-option
              v-for="(item, index) in riskPointTypeList"
              :key="index"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('index_6')">
          <el-select
            v-model="listQuery.riskLevelId"
            clearable
            :placeholder="$t('index_5')"
          >
            <el-option
              v-for="(item, index) in riskLevelList"
              :key="index"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('index_7')">
          <el-input
            @keyup.enter.native="handleSearch"
            class="filter-item"
            :placeholder="$t('index_3')"
            v-model="listQuery.addressName"
            clearable
          ></el-input>
        </el-form-item>
      </template>
    </search-show-hidden>

    <list-page
      :tableData="list"
      :total="total"
      :formCode="formCode"
      :moduleCode="moduleCode"
      :defaultConfig="defaultConfig"
      class="dict-table"
      :current="listQuery.current"
      @sizeChange="handleSizeChange"
      @currentChange="handleIndexChange"
    >
      <template v-slot:default="{item, row}">
        <span v-if="item.property === 'executeUserName'">
          {{
            row.riskPointExecutorList && row.riskPointExecutorList.length ? row.riskPointExecutorList.map((item) => item.executeUser)
                  .join(",") : "-"
          }}
        </span>
        <template v-else-if="item.property === 'riskLevelId'">
          <span
            v-if="row.riskLevelId"
            class="custom-tag"
            :class="handleRiskLevelClass(row.riskLevelId)"
          >{{ row.riskLevel }}{{ row.riskAdjustRecord ? `(${row.riskAdjustRecord.adjustAssessParam})` : '' }}</span>
          <span v-else>-</span>
        </template>
        <span v-else-if="item.property === 'riskAdjustRecord'">
          {{ row.riskAdjustRecord ? `${row.riskAdjustRecord.riskLevel}(${row.riskAdjustRecord.assessParam})` : '-'}}
        </span>
        <span v-else-if="item.property === 'locationName'">
          {{ row.riskAddressList ? row.riskAddressList.map((item) => item.addressName).join(",") : "-"}}
        </span>
        <span v-else-if="item.property === 'specialityName'">
          {{ row.specialityList ? row.specialityList.map((item) => item.specialityName).join(",") : "-"}}
        </span>
        <span v-else>
          {{ row[item.property]? row[item.property] : '-'}}
        </span>
      </template>
      <template v-slot:operator="{row}">
        <el-button
          @click.native.prevent="handleDetail(row, 'update')"
          v-if="riskControl_relate"
          type="primary"
          size="mini"
          plain
        >{{$t('index_8')}}</el-button>
        <el-button
          @click.native.prevent="handleDetail(row, 'detail')"
          type="primary"
          size="mini"
          plain
        >{{$t('index_9')}}</el-button>
        <el-button
          type="warning"
          size="mini"
          plain
          v-if="row.riskPointTypeId !== '001' && riskControl_return"
          @click="handleEdit(row)"
        >{{$t('index_10')}}</el-button>
        <el-button
          @click.native.prevent="handleCancel(row)"
          v-if="row.riskPointTypeId === '001' && riskControlList_can"
          type="warning"
          plain
          size="mini"
        >{{$t('index_11')}}</el-button>
        <el-button
          @click.native.prevent="handleDelete(row)"
          v-if="row.riskPointTypeId !== '001' && riskControlList_del"
          type="warning"
          plain
          size="mini"
        >{{$t('index_12')}}</el-button>
      </template>
    </list-page>
    <!-- <list-page
      title="风险清单"
      @handleReset="handleReset"
      @handleSearch="handleSearch"
    >
      <el-table
        class="dict-table"
        :key="randomKey"
        v-loading.iTable="options.loading"
        :data="list"
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        style="width: 99%"
        tooltip-effect="dark"
        ref="mutipleTable"
        :cell-style="setCellColor"
      >
        <el-table-column

          fixed="left"
          type="index"
          label="序号"
          property="index"
          width="60"
        >
          <template slot-scope="scope">
            {{ (listQuery.current - 1) * listQuery.size + scope.$index + 1 }}
          </template>
        </el-table-column>
        <template v-for="(item, index) in tableColumnList">
          <el-table-column
            v-if="item.property === 'riskPoint'"
            :key="index"
            :min-width="item.labelWidth"
            :show-overflow-tooltip="item.hideMoreData"
            :label="
              item.customeName !== null ? item.customeName : item.showName
            "
            :property="item.property"
          >
            <template slot-scope="{ row }">
              <span v-if="row.riskPoint">{{ row.riskPoint }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.property === 'executeUserName'"
            :key="index"
            :min-width="item.labelWidth"
            :show-overflow-tooltip="item.hideMoreData"
            :label="
              item.customeName !== null ? item.customeName : item.showName
            "
            :property="item.property"
          >
            <template slot-scope="{ row }">
              <span>{{
                row.riskPointExecutorList ? row.riskPointExecutorList.map((item) => item.executeUser)
                      .join(",") : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.property === 'riskLevelId'"
            :min-width="item.labelWidth"
            :key="index"
            :show-overflow-tooltip="item.hideMoreData"
            :label="
              item.customeName !== null ? item.customeName : item.showName
            "
            :property="item.property"
          >
            <template slot-scope="{ row }">
              <span
                v-if="row.riskLevelId"
                class="custom-tag"
                :class="handleRiskLevelClass(row.riskLevelId)"
              >{{ row.riskLevel }}{{ row.riskAdjustRecord ? `(${row.riskAdjustRecord.adjustAssessParam})` : '' }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.property === 'riskAdjustRecord'"
            :key="index"
            :min-width="item.labelWidth"
            :show-overflow-tooltip="item.hideMoreData"
            :label="
              item.customeName !== null ? item.customeName : item.showName
            "
            :property="item.property"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.riskAdjustRecord ? `${scope.row.riskAdjustRecord.riskLevel}(${scope.row.riskAdjustRecord.assessParam})` : '-'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.property === 'locationName'"
            :key="index"
            :min-width="item.labelWidth"
            :show-overflow-tooltip="item.hideMoreData"
            :label="
              item.customeName !== null ? item.customeName : item.showName
            "
            :property="item.property"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.riskAddressList
                  ? scope.row.riskAddressList
                      .map((item) => item.addressName)
                      .join(",")
                  : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.property === 'specialityName'"
            :min-width="item.labelWidth"
            :key="index"
            :show-overflow-tooltip="item.hideMoreData"
            :label="
              item.customeName !== null ? item.customeName : item.showName
            "
            :property="item.property"
          >
            <template slot-scope="{ row }">
              <span>{{
                row.specialityList ? row.specialityList.map((item) => item.specialityName)
                      .join(",") : "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :min-width="item.labelWidth"
            :show-overflow-tooltip="item.hideMoreData"
            :label="
              item.customeName !== null ? item.customeName : item.showName
            "
            :property="item.property"
          >
            <template slot-scope="scope">
              <span v-if="scope.row[item.property]">{{ scope.row[item.property] }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div
              class="optionDiv"
              style="white-space: nowrap; display: inline-block"
            >
              <el-button
                @click.native.prevent="handleDetail(scope.row, 'update')"
                v-if="riskControl_relate"
                type="primary"
                size="mini"
                plain
                >关联管控责任人
              </el-button>
              <el-button
                @click.native.prevent="handleDetail(scope.row, 'detail')"
                type="primary"
                size="mini"
                plain
              >详情
              </el-button>
              <el-button
                type="warning"
                size="mini"
                plain
                v-if="scope.row.riskPointTypeId !== '001' && riskControl_return"
                @click="handleEdit(scope.row)"
                >修订</el-button
              >
              <el-button
                @click.native.prevent="handleCancel(scope.row)"
                v-if="scope.row.riskPointTypeId === '001' && riskControlList_can"
                type="warning"
                plain
                size="mini"
              >取消
              </el-button>
              <el-button
                @click.native.prevent="handleDelete(scope.row)"
                v-if="scope.row.riskPointTypeId !== '001' && riskControlList_del"
                type="warning"
                plain
                size="mini"
              >删除
              </el-button>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="50"
        >
          <template #header>
            <i
              class="el-icon-s-tools pointerIcon"
              @click="tableConfig"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <div
        v-show="!options.loading"
        class="pagination-container flex-end"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleIndexChange"
          :page-size="listQuery.size"
          :page-sizes="[15, 20, 50, 100]"
          :current-page="listQuery.current"
          layout="total,sizes, prev, pager, next,jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
    </list-page> -->
    <!--详情-->
    <detail-dialog
      v-if="isShowDetailDialog"
      ref="detailDialogRefs"
      @refreshData="getDataList"
    ></detail-dialog>
  </div>
</template>
<script>
import i18n from '../locales/index'

import {
  fetchList,
  deleteRiskListById,
  cancelRiskListById,
  fetchFallback,
} from "../api/api";
import { getStore } from "@/util/store";
import { fetchDict } from "../../../common/common";
import { mapState } from "vuex";
import DetailDialog from './detail'
import defaultConfig from '@/mixins/tableConfig/sams-risk-control/risk_list_detail'
export default {
  components: {
    DetailDialog,
  },
  data () {
    return {
      defaultConfig,
      total: 0,
      listQuery: {
        current: 1,
        size: 20,
        riskPoint: "",
        riskPointTypeId: "",
        riskLevelId: "",
        orgCode: "",
        addressName: "",
        allSubordinateOrg: null
      }, // 搜索条件
      riskPointTypeList: [], // 风险点类型列表
      riskLevelList: [], // 风险等级
      tableConfigDialog: false, // 表格配置弹框
      list: [], // table数据
      options: {
        stripe: false, // 是否为斑马纹 table
        loading: true, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        border: true, // 是否显示竖直方向得边框
        isIndexShow: true, // 是否显示索引
        indexTitle: i18n.t('index_13'), // 索引头名称
      }, // table 的参数
      randomKey: new Date().getTime(),
      riskControlList_can: false, // 取消
      riskControlList_del: false, // 删除
      riskControl_return: false, // 修订
      riskControl_relate: false,
      isShowDetailDialog: false, // 详情弹窗
      showInfoFlag: false,
      formCode: 'risk_list_detail',
      moduleCode: "sams-risk-control",
      echoForm: null,
      isLogicOrg: false
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  watch: {
    "$route.query": {
      handler (val) {
        console.log('val', val);
        if (val.planId) {
          this.listQuery.planId = val.planId
          this.listQuery.riskPointTypeId = val.riskPointTypeId
          this.getDataList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    if (process.env.VUE_APP_MAIN_APPLICATION) {
      this.isLogicOrg = true
    } else {
      this.isLogicOrg = false
    }
    this.listQuery.orgCode = this.userInfo.orgCode;
    this.echoForm = {
      orgCode: this.userInfo.orgCode
    }
    this.initPermissions();
    this.getConfigVal("sams_points_type");
    this.getConfigVal("system_risk_level");
    this.getDataList();
  },
  activated () {
    this.getDataList()
    this.setCellColor()
  },
  methods: {
    initPermissions () {
      let permissions = getStore({ name: "permissions" });
      this.riskControlList_del = permissions["riskControlList_del"];
      this.riskControl_return = permissions["riskControl_return"];
      this.riskControlList_can = permissions["riskControlList_can"];
      this.riskControl_relate = permissions["riskControl_relate"];
    },
    // 获取字典
    getConfigVal (dicType) {
      // 获取风险等级
      fetchDict(dicType).then((res) => {
        if (res.data.code === 0) {
          // 风险点类型
          if (dicType === "sams_points_type") {
            this.riskPointTypeList = res.data.data
          }

          if (dicType === "system_risk_level") {
            // 风险等级
            this.riskLevelList = res.data.data
          }
        }
      });
    },
    //搜索框折叠
    showInfo () {
      this.showInfoFlag = !this.showInfoFlag
    },
    setCellColor ({ row, column, rowIndex, columnIndex }) {
      this.$nextTick(() => {
        if (column.label === i18n.t('index_14')) {
          const opts = document.getElementsByClassName("optionDiv");
          let widthArr = [];
          // 取操作组的最大宽度
          Array.prototype.forEach.call(opts, (item) => {
            if (item.innerText) {
              widthArr.push(item.offsetWidth);
            }
          });
          column.width = widthArr.length > 0 ? Math.max(...widthArr) + 30 : 60;
        }
      });
    },
    // 搜索
    handleSearch () {
      this.listQuery.current = 1;
      this.listQuery.size = 20;
      this.getDataList();
    },
    getOrg (data) {
      if(data) {
        this.listQuery.orgCode = data.code
      } else {
        this.listQuery.orgCode = undefined
      }
    },
    // 重置
    handleReset () {
      this.listQuery = {
        current: 1,
        size: 20,
        riskPoint: "",
        riskPointTypeId: "",
        riskLevelId: "",
        addressName: "",
        orgCode: this.userInfo.orgCode,
      };
      this.echoForm = {
        orgCode: this.userInfo.orgCode
      }
      this.getDataList();
    },
    // 获取表格数据
    getDataList () {
      this.options.loading = true;
      if (process.env.VUE_APP_MAIN_APPLICATION) {
        this.listQuery.allSubordinateOrg = "0"
      } else {
        this.listQuery.allSubordinateOrg = "1"
      }
      fetchList(this.listQuery)
        .then((res) => {
          const { code, data } = res.data;
          if (code === 0) {
            this.list = data.records;
            this.total = parseInt(data.total);
          }
        })
        .finally(() => {
          this.options.loading = false;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    handleRiskLevelClass (val) {
      console.log(val, '1234');

      switch (val) {
        case 1:
          return "red-color";
        case 2:
          return "orange-color";
        case 3:
          return "yellow-color";
        case 4:
          return "blue-color";
        default:
          return "";
      }
    },
    // 切换每页显示的数量
    handleSizeChange (pagination) {
      this.listQuery.current = 1;
      this.listQuery.size = pagination;
      this.getDataList();
    },
    // 切换页码
    handleIndexChange (pagination) {
      this.listQuery.current = pagination;
      this.getDataList();
    },
    // 修订
    handleEdit (row) {
      console.log(row);
      if (!row.riskLevelId) return this.$confirm(i18n.t('index_15'), i18n.t('index_16'), {
        confirmButtonText: i18n.t('index_17'),
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      });
      this.$confirm(i18n.t('index_18'), i18n.t('index_16'), {
        confirmButtonText: i18n.t('index_17'),
        cancelButtonText: i18n.t('index_11'),
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = i18n.t('index_19');
            fetchFallback(row.riskPointId)
              .then(() => {
                this.$router.push({
                  name: 'riskPointList'
                })
                this.getDataList();
                done();
                instance.confirmButtonLoading = false;
              })
              .catch((err) => {
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = i18n.t('index_17');
              });
          } else {
            done();
          }
        },
      }).then(() => {
        // this.$notify({
        //   title: "成功",
        //   message: "操作成功",
        //   type: "success",
        //   duration: 2000,
        // });
      });
    },

    // 详情
    handleDetail (row, type) {
      console.log('row', row);
      // row.riskLevel = this.handleRiskLevel(row.riskLevelId);
      this.isShowDetailDialog = true;
      this.$nextTick(() => {
        this.$refs.detailDialogRefs.openDialog(row, type)
      })
    },
    // 取消
    handleCancel (row) {
      this.$confirm(
        i18n.t('index_20'),
        i18n.t('index_21'),
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: i18n.t('index_17'),
          cancelButtonText: i18n.t('index_11'),
          type: "warning",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = i18n.t('index_19');
              cancelRiskListById(row.id)
                .then(() => {
                  this.getDataList();
                  done();
                  instance.confirmButtonLoading = false;
                })
                .catch((err) => {
                  instance.confirmButtonLoading = false;
                  instance.confirmButtonText = i18n.t('index_17');
                });
            } else {
              done();
            }
          },
        }
      ).then(() => {
        this.$notify({
          title: i18n.t('index_22'),
          message: i18n.t('index_23'),
          type: "success",
          duration: 2000,
        });
      });
    },
    // 删除
    handleDelete (row) {
      this.$confirm(
        i18n.t('index_24'), i18n.t('index_16'),
        {
          confirmButtonText: i18n.t('index_17'),
          cancelButtonText: i18n.t('index_11'),
          type: "warning",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = i18n.t('index_19');
              deleteRiskListById(row.id)
                .then(() => {
                  this.getDataList();
                  done();
                  instance.confirmButtonLoading = false;
                })
                .catch((err) => {
                  instance.confirmButtonLoading = false;
                  instance.confirmButtonText = i18n.t('index_17');
                });
            } else {
              done();
            }
          },
        }
      ).then(() => {
        this.$notify({
          title: i18n.t('index_22'),
          message: i18n.t('index_23'),
          type: "success",
          duration: 2000,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-page {
  position: relative;
  background-color: #fff;
  padding: 24px;
  height: 100%;
  /*min-width: 1600px;*/
}

.filter-container {
  position: relative;
}
html.dark {
  .dict-table {
    ::v-deep th.el-table__cell {
      background-color: #050d1b;
    }
  }
}
.dict-table {
  ::v-deep th.el-table__cell {
    background-color: #f5f7fa;
  }

  .btn-warning-color {
    color: #e6a23c;
    &:hover {
      color: #e6a23c;
    }
  }
  .btn-danger-color {
    color: #f56c6c;
    &:hover {
      color: #f56c6c;
    }
  }
  .btn-success-color {
    color: #67c23a;
    &:hover {
      color: #67c23a;
    }
  }

  .custom-tag {
    display: inline-block;
    width: 76px;
    height: 24px;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 400;
    color: #000;
    text-align: center;

    &.red-color {
      background: rgb(255, 0, 0);
    }

    &.orange-color {
      background: rgb(255, 97, 0);
    }

    &.yellow-color {
      background: rgb(255, 255, 0);
    }

    &.blue-color {
      background: #409eff;
    }
  }
}

.steps {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  .step {
    font-size: 14px;
    color: #333;
    text-align: center;
    border: 1px solid #dcdfe6;
    height: 40px;
    line-height: 40px;
    width: 150px;
    cursor: pointer;

    &:first-of-type {
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
      border-right: 0;
    }

    &:nth-of-type(2) {
      border-right: 0;
    }

    &:last-of-type {
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
      border-left: 0;
    }

    &:hover {
      background-color: #dcdfe6;
    }

    &.active {
      background-color: #409eff;
      color: #fff;
      border-color: #409eff;

      &:hover {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
.show-btn {
  margin-left: 40px;
  font-size: 14px;
  color: #1e88f5;
  line-height: 32px;
  cursor: pointer;
}
</style>
