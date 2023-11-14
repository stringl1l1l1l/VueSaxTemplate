<template>
    <vs-sidebar
      click-not-close
      position-right
      default-index="1"
      parent="body"
      color="primary"
      class="user-info-editor"
      spacer
      v-model="isEditorActiveLocal">
      <div class="mt-6 flex items-center justify-between px-6">
        <div v-if="enableEdit">
          <h4>编辑信息</h4>
        </div>
        <div v-else>
          <h4>查看详情</h4>
        </div>
        <feather-icon icon="XIcon" @click.stop="isEditorActiveLocal = false" class="cursor-pointer"></feather-icon>
      </div>

      <vs-divider class="mb-0"></vs-divider>

      <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

        <div class="p-6">
          <div class="vx-row mb-6 mt-2">
            <div class="vx-col w-full">
              <vs-input class="w-full" disabled="true" label="手机号" v-model="tempCurRow.account" />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input class="w-full" type="username" label="用户名" v-model="tempCurRow.username" />
            </div>
          </div>
          <div class="vx-row  mb-6">
            <div class="vx-col w-full">
              <p class="ml-1" style="font-size: 6px">状态</p>
              <vs-button :color="getTypeColor(tempCurRow.type)" type="border" size="small" class="product-order-status">{{ typeFilter(tempCurRow.type) }}</vs-button>
              <vs-dropdown>
                <vs-button v-if="enableEdit" class="btn-drop" type="border" size="small" :color="getTypeColor(tempCurRow.type)" icon="expand_more"></vs-button>
                <vs-dropdown-menu>
                  <ul style="min-width: 5rem">
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="flag = 0;chooseStatus(tempCurRow)"> 正常 </li>
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="flag = 1;chooseStatus(tempCurRow)"> 密接 </li>
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="flag = 2;chooseStatus(tempCurRow)"> 确诊 </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </div>

          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <p class="ml-1" style="font-size: 6px">性别</p>
              <vs-button type="border" size="small" >{{ sexFilter(tempCurRow.sex) }}</vs-button>
              <vs-dropdown>
                <vs-button v-if="enableEdit" class="btn-drop" type="border" size="small" icon="expand_more"></vs-button>
                <vs-dropdown-menu>
                  <ul style="min-width: 5rem">
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="sex = 0;chooseSex(tempCurRow)"> 男 </li>
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="sex = 1;chooseSex(tempCurRow)"> 女 </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input class="w-full" label="年龄" v-model="tempCurRow.age" />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input class="w-full" label="接触时间" v-model="tempCurRow.time" />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col w-full">
              <vs-input class="w-full" label="地址" v-model="tempCurRow.address" />
            </div>
          </div>

          <div v-if="enableEdit" class="vx-row  mb-6">
            <div class="vx-col w-full ">
              <vs-button type="border" class=" ml-2 mr-3 mb-2" @click="submit">提交</vs-button>
              <vs-button color="warning" type="border" class="ml-2 mr-3 mb-2" @click.prevent="initData">重置</vs-button>
              <vs-button color="success" type="border" class="ml-2 mr-3 mb-2" @click.prevent="clearData">清空</vs-button>
              <vs-button color="danger" type="border" class="ml-2 mb-2" @click.stop="isEditorActiveLocal = false">取消</vs-button>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import {getTypeColor, sexFilter, typeFilter} from "@/main";

export default {
  model: {
    prop: 'curRow',
    event: 'change',
  },
  props: {
    curRow: {
      required: true
    },
    isEditorActive: {
      type: Boolean,
      required: true
    },
    enableEdit: true
  },
  watch: {
    curRow(val) {
      for (let key in val) {
        this.tempCurRow[key] = val[key]
      }
    },
  },
  data() {
    return {
      tempCurRow: {},
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
      choose: ['编辑信息','查看详情'],
      flag: 0,
      sex: 0
    }
  },
  computed: {
    isEditorActiveLocal: {
      get() {
        return this.isEditorActive
      },
      set(val) {
        if (!val) {
          this.$emit('closeEditor');
          console.log('close')
        }
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.tempCurRow)
    },
    initData() {
      for (let key in this.curRow) {
        this.tempCurRow[key] = this.curRow[key]
      }
      this.$forceUpdate()
    },
    clearData() {
      for (let key in this.curRow) {
        this.tempCurRow[key] = ''
      }
      this.$forceUpdate()
    },
    chooseSex(row) {
      this.tempCurRow.sex = this.sex
      this.$forceUpdate()
    },
    chooseStatus(row) {
      this.tempCurRow.type = this.flag
      this.$forceUpdate()
    },
    getTypeColor: getTypeColor,
    typeFilter: typeFilter,
    sexFilter: sexFilter,
  },
  components: {
    VuePerfectScrollbar
  }
}
</script>

<style scoped>

</style>
