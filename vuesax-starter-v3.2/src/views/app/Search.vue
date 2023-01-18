<template>
  <div id="faq-page">

    <user-info-editor :cur-row="curRow" :isEditorActive="editorActive" @closeEditor="editorActive = false"
      :enable-edit="false" />
    <!-- JUMBOTRON -->
    <div class="faq-jumbotron">

      <div class="faq-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base">
        <h1 class="mb-1 text-white">接触者查询</h1>

        <vs-input placeholder="输入手机号" v-model="searchQuery" icon-pack="feather" icon="icon-search" size="large"
          class="w-full mt-5 mb-0" icon-no-border />

        <div class="vx-row">
          <div class="vx-col sm:w-full w-full ml-auto">
            <vs-button class="mr-3 mb-2 mt-3" type="gradient" @click.prevent="submitSearch">查询</vs-button>
            <vs-button class="mr-3 mb-2 mt-3" type="gradient" color="warning" @click.prevent="resetData">重置</vs-button>

            <vs-button class="btnx" type="gradient" color="success">标记选中为</vs-button>
            <vs-dropdown>
              <vs-button class="btn-drop " type="gradient" color="success" icon="expand_more"></vs-button>
              <vs-dropdown-menu>
                <ul style="min-width: 5rem">
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="flag = 0;markSelected();selected = []"> 正常 </li>
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="flag = 1;markSelected();selected = []"> 密接 </li>
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="flag = 2;markSelected();selected = []"> 确诊 </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full md:w-full lg:w-full mt-12 md:mt-0 ">
        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between ">

          <div class="flex flex-wrap-reverse items-center">

          </div>
        </div>
        <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" :data="searchResult">
          <template slot="thead">
            <vs-th sort-key="userId">id</vs-th>
            <vs-th sort-key="account">手机号</vs-th>
            <vs-th sort-key="mac">Mac</vs-th>
            <vs-th sort-key="type">类型</vs-th>
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
                  <p class="product-price">{{ tr.mac }}</p>
                </vs-td>

                <vs-td>
                  <vs-chip :color="getTypeColor(tr.type)" class="product-order-status">{{ typeFilter(tr.type) }}
                  </vs-chip>
                </vs-td>

                <vs-td>
                  <p class="product-price">{{ tr.time }}</p>
                </vs-td>

                <vs-td>
                  <vs-button color="primary" size="small" @click="handleEdit(tr)">查看</vs-button>
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
    </div>
  </div>
</template>

<script>

import {findAllUsers, findUsersByMap, updateUserById} from "@/api/user";
import {findCloseByMap} from "@/api/close";
import {getTypeColor, typeFilter} from "@/main";
import UserInfoEditor from "@/views/UserInfoEditor";

export default{
  data() {
    return {
      list: [
        {
          userId: null,
          account: '',
          username: '',
          password: '',
          type: 0,
          sex: 0,
          age: 0,
          mac: null,
          address: null,
          time: null
        }
      ],
      flag: null,
      markList: [],
      searchQuery: '',
      searchResult: [],
      itemsPerPage: 10,
      selected: [],
      editorActive: false,
      dialogActive: false,
      curRow: {},
      getTypeColor: getTypeColor,
      typeFilter: typeFilter
    }
  },
  watch: {

  },
  computed: {
  },
  methods: {
    fetchData() {
      findAllUsers().then(response => {
        this.list = response.data
        this.searchResult = []
        for (let elm of this.list) {
          this.searchResult.push(elm)
        }
      })
    },
    handleEdit(tr) {
      this.curRow = tr
      this.editorActive = true
    },
    markSelected() {
      for (let elem of this.selected) {
         updateUserById({ 'userId' : elem.userId, 'type' : this.flag } ).then(() => {
           this.$nextTick(this.fetchData)
         })
      }
    },
    submitSearch() {
      const map = {
        'account_a' : this.searchQuery
      }
      findCloseByMap(map).then(response => {
        if (response.data) {
          this.searchResult = []
          const tempList = response.data
          for (const tempListElement of tempList) {
            findUsersByMap({'account': tempListElement.accountB}).then(response=> {
              this.searchResult.push(...response.data)
              }
            )
          }
        }
        else
          this.searchResult = []
      })
    },
    resetData() {
      this.searchResult = []
      for (let elm of this.list) {
        this.searchResult.push(elm)
      }
      this.searchQuery = null
    }
  },
  created() {
    this.fetchData()
  },
  components: {
    UserInfoEditor,
  },
  beforeRouteLeave(to, from, next){
    this.editorActive = false
    next()
  }
}
</script>

<style lang="scss">



#faq-page {
  .faq-jumbotron-content {
    background-image: url('./picture/star.png');
    background-size: cover;
  }

  .faq-bg {
    background-color: #fff;
  }
}
</style>
