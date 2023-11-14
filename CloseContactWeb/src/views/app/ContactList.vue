<template>
  <div id="userList">
    <vx-card>
      <user-info-editor
        :cur-row="curRow"
        :isEditorActive="editorActive"
        @submit="handleSubmit"
        :enable-edit="false"
        @closeEditor="editorActive = false" />

      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap justify-between items-center">

      </div>
      <vs-table
        ref="table"
        v-model="selected"
        pagination
        :max-items="itemsPerPage"
        :data="list"
        search
        class="mt-2"
      >
        <template slot="thead">
          <vs-th sort-key="userId">id</vs-th>
          <vs-th sort-key="account">手机号</vs-th>
          <vs-th sort-key="username">用户名</vs-th>
          <vs-th sort-key="type">类型</vs-th>
          <vs-th sort-key="age">年龄</vs-th>
          <vs-th sort-key="sex">性别</vs-th>
          <vs-th sort-key="mac">Mac</vs-th>
          <vs-th sort-key="time">接触时间</vs-th>
        </template>

        <template slot-scope="{data}">
          <tbody>
          <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

            <vs-td>
              <p class="font-medium">{{ tr.userId }}</p>
            </vs-td>

            <vs-td>
              <p class="font-medium">{{ tr.account }}</p>
            </vs-td>

            <vs-td>
              <p class="font-medium" >{{ tr.username }}</p>
            </vs-td>

            <vs-td>
              <vs-chip :color="getTypeColor(tr.type)" class="product-order-status">{{ typeFilter(tr.type) }}</vs-chip>
            </vs-td>

            <vs-td>
              <p class="font-medium">{{ tr.age }}</p>
            </vs-td>

            <vs-td>
              <p class="font-medium">{{ sexFilter(tr.sex) }}</p>
            </vs-td>

            <vs-td>
              <p class="font-medium">{{ tr.mac }}</p>
            </vs-td>

            <vs-td>
              <p class="font-medium">{{ tr.time }}</p>
            </vs-td>

            <vs-td>
              <vs-button color="primary" size="small" @click="handleEdit(index, tr)">查看</vs-button>
            </vs-td>

          </vs-tr>
          </tbody>
        </template>
      </vs-table>

    </vx-card>
  </div>
</template>

<script>
import {AgGridVue} from "ag-grid-vue"
import '@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss'
import {findUsersByMap, updateUserById} from "@/api/user";
import {getTypeColor, sexFilter, typeFilter} from "@/main";
import UserInfoEditor from "@/views/UserInfoEditor";

const VxTour = () => import('@/components/VxTour.vue')

export default {
  components: {
    AgGridVue,
    VxTour,
    UserInfoEditor
  },
  created() {
    findUsersByMap({type: 1}).then( response =>{
      if(response.data)
        this.list.push(...response.data)
    })
    findUsersByMap({type: 2}).then( response =>{
      if(response.data)
        this.list.push(...response.data)
    })
  },
  data() {
    return {
      list: [],
      searchQuery: '',
      selected: [],
      itemsPerPage: 10,
      index: null,
      editorActive: false,
      curRow: {},
      getTypeColor: getTypeColor,
      typeFilter: typeFilter,
      sexFilter: sexFilter
    }
  },
  watch: {

  },
  computed: {
  },
  methods: {
    updateUserById: updateUserById,
    handleSubmit(newRow) {
      newRow.password = null
      this.updateUserById(newRow).then(response => {
        if(newRow.type === '0')
        {
          this.list.splice(this.index,1)
          console.log('del')
        }
        else {
          for (let key in newRow) {
            if(newRow[key])
              this.list[this.index][key] = newRow[key]
          }
        }
        this.editorActive = false
        this.$vs.notify({
          time: 2500,
          title: '操作成功',
          text: response.data,
          iconPack: 'feather',
          position: 'top-center',
          icon: 'icon-alert-circle',
          color: 'success',
        })
      })
    },
    handleEdit(index, tr) {
      this.editorActive = true
      this.index = index
      this.curRow = tr
    },
  },
  beforeRouteLeave(to, from, next){
    this.editorActive = false
    next()
  }
}

</script>
