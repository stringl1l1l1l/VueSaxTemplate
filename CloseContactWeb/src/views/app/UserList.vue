<template>
  <div id="userList">
    <vx-card>
        <user-info-editor
          :cur-row="curRow"
          :isEditorActive="editorActive"
          @closeEditor="editorActive = false"
          :enable-edit="false"
          @submit="handleSubmit"/>
      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap justify-between items-center">

      </div>
      <vs-table
        ref="table"
        v-model="selected"
        pagination
        search
        :max-items="itemsPerPage"
        :data="list"
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
              <p class="product-name font-medium">{{ tr.userId }}</p>
            </vs-td>

            <vs-td>
              <p class="product-category">{{ tr.account }}</p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium">{{ tr.username }}</p>
            </vs-td>

            <vs-td>
              <vs-chip :color="getTypeColor(tr.type)" class="product-order-status">{{ typeFilter(tr.type) }}</vs-chip>
            </vs-td>

            <vs-td>
              <p class="product-price">{{ tr.age }}</p>
            </vs-td>

            <vs-td>
              <p class="product-price">{{ sexFilter(tr.sex) }}</p>
            </vs-td>

            <vs-td>
              <p class="product-price">{{ tr.mac }}</p>
            </vs-td>

            <vs-td>
              <p class="product-price">{{ tr.time }}</p>
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
import {findAllUsers, updateUserById} from "@/api/user";
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
    findAllUsers().then( response =>{
      this.list = response.data
      console.log(this.list)
    })
  },
  data() {
    return {
      list: [],
      searchQuery: '',
      selected: [],
      index: null,
      itemsPerPage: 10,
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
        for (let key in newRow) {
          if(newRow[key])
            this.list[this.index][key] = newRow[key]
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
