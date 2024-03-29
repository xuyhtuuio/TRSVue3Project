<template>
  <el-dialog
    :title="title"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :modal="false"
    v-model="showData"
    :before-close="close"
    width="810px"
    center
  >
    <div class="picker" ref="qwe">
      <div style="float: left">
        <div class="box left-box">
          <div class="right-item-box">
            <el-radio-group v-model="roleRange" style="display: block">
              <el-radio label="全行">全行</el-radio>
              <el-radio label="本行">本行</el-radio>
              <el-radio label="本部门">本部门</el-radio>
            </el-radio-group>
          </div>
          <div class="tabs">
            <div
              class="user tab"
              :class="{ 'is-active': active === 'user' }"
              @click="changeTabType('user')"
            >
              <i class="iconfont icon-dept"></i>
              部门/人员
            </div>
            <div
              v-if="!hidden.includes('系统角色')"
              class="role tab"
              :class="{ 'is-active': active === 'role' }"
              @click="changeTabType('role')"
            >
              <i class="iconfont icon-xitong-juese"></i>
              系统角色
            </div>
          </div>
          <div>
            <el-input
              v-if="type !== 'dept'"
              :placeholder="active === 'user' ? '搜索部门/人员' : '搜索系统角色'"
              prefix-icon="el-icon-search"
              size="medium"
              v-model="search"
              :maxlength="50"
              clearable
            >
            </el-input>
          </div>
          <div style="margin-top: 8px; width: 100%; height: 400px">
            <div
              style="margin-top: 8px; overflow-y: auto"
              :style="{ height: active === 'user' ? 'calc(100% - 170px)' : 'calc(100% - 160px)' }"
            >
              <el-tree
                v-show="active === 'user'"
                :data="data"
                show-checkbox
                default-expand-all
                :filter-node-method="filterNode"
                node-key="id"
                ref="user"
                highlight-current
                :props="defaultProps"
                @check="checkChange"
              >
              </el-tree>
              <el-tree
                v-show="active === 'role'"
                :data="roleData"
                show-checkbox
                default-expand-all
                :filter-node-method="filterNode"
                node-key="id"
                ref="role"
                highlight-current
                :props="defaultProps"
                @check="checkRoleChange"
              >
                <template #default="{ data }">
                  <span class="custom-tree-node">
                    <span>
                      <svg
                        class="icon"
                        aria-hidden="true"
                        style="position: relative; top: 1px; width: 18px; height: 18px"
                      >
                        <use xlink:href="#icon-multiple-user"></use>
                      </svg>
                      {{ data.name }}
                    </span>
                  </span>
                </template>
              </el-tree>
            </div>
          </div>
        </div>
      </div>

      <div style="float: right">
        <div class="box right-box">
          <p class="check-desc">
            <span>已选 {{ checkedTotal }} 项</span>
            <span @click="clearAll" class="clear" :class="{ 'can-clear': !checkedTotal }">
              <i class="iconfont icon-clear"></i>
              清空
            </span>
          </p>
          <div style="overflow-x: hidden; overflow-y: auto; height: calc(100% - 36px)">
            <div class="right-item-box" v-show="rightCheckedList.user.length">
              <span class="title">人员</span>
              <div
                v-for="(node, index) in rightCheckedList.user"
                :key="node.label + index"
                @mouseover="handleMouseover('hoverActiveUser', node.label)"
                @mouseout="handleMouseout('hoverActiveUser')"
                class="line"
              >
                <span class="label">{{ node.label }}</span>
                <i
                  class="el-icon-close"
                  v-if="hoverActiveUser === node.label"
                  @click="deleteNode('user', node.id)"
                ></i>
              </div>
            </div>
            <div class="right-item-box" v-show="rightCheckedList.dept.length">
              <span class="title">部门</span>
              <div
                v-for="(node, index) in rightCheckedList.dept"
                :key="node.label + index"
                @mouseover="handleMouseover('hoverActiveDept', node.label)"
                @mouseout="handleMouseout('hoverActiveDept')"
                class="line"
              >
                <span class="label">{{ node.label }}</span>
                <i
                  class="el-icon-close"
                  v-if="hoverActiveDept === node.label"
                  @click="deleteNode('dept', node.id)"
                ></i>
              </div>
            </div>
            <div class="right-item-box" v-show="rightCheckedList.role.length">
              <span class="title">系统角色</span>
              <div
                v-for="(node, index) in rightCheckedList.role"
                :key="node.label + index"
                @mouseover="handleMouseover('hoverActiveRole', node.label)"
                @mouseout="handleMouseout('hoverActiveRole')"
                class="line"
              >
                <span class="label">{{ node.label }}</span>
                <i
                  class="el-icon-close"
                  v-if="hoverActiveRole === node.label"
                  @click="deleteNode('role', node.id)"
                ></i>
              </div>
            </div>
            <div
              v-if="checkedTotal === 0"
              style="text-align: center; color: #86909c; margin-top: 80px"
            >
              <img src="../../assets/image/empty.png" style="width: 151px" />
              <p>请点击左侧列表选择数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close" size="mini" style="width: 140px">取 消</el-button>
        <el-button type="primary" @click="selectOk" size="mini" style="width: 140px"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getOrgTree, queryUserList } from '@/api/org.js'

export default {
  name: 'organizationPicker',
  props: {
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      default: '请选择',
      type: String
    },
    // 选择哪种类型  user=人和部门  dept=只能选部门
    type: {
      default: 'user',
      type: String
    },
    // 隐藏tab
    hidden: {
      type: Array,
      default: () => []
    },
    // 是否单选
    single: {
      default: false,
      type: Boolean
    },
    // 已经选中的
    selected: {
      default: () => [],
      type: Array
    },
    onlyUser: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      hoverActiveUser: '',
      hoverActiveRole: '',
      hoverActiveDept: '',
      active: 'user',
      roleRange: '全行',
      checkAll: false,
      nowDeptId: null,
      isIndeterminate: false,
      navNodes: [],
      navNodePointer: null,
      searchUsers: [],
      nodes: [],
      select: [],
      search: '',
      avatarColor: [
        '#1e90ff',
        '#ff4500',
        '#ffc10a',
        '#d2b100',
        '#76c376',
        '#00ced1',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsl(181, 100%, 37%)'
      ],
      data: [],
      roleData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rightCheckedList: {
        user: [],
        dept: [],
        role: []
      },
      timer: null
    }
  },
  computed: {
    checkedTotal() {
      return (
        this.rightCheckedList.user.length +
        this.rightCheckedList.dept.length +
        this.rightCheckedList.role.length
      )
    },
    showData() {
      return this.show
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.queryUserList()
      }
    },
    search(val) {
      this.$refs[this.active].filter(val)
    }
  },
  mounted() {},
  methods: {
    handleMouseover(hover, label) {
      this[hover] = label
      clearTimeout(this.timer)
    },
    handleMouseout(hover) {
      this.timer = setTimeout(() => {
        this[hover] = ''
      }, 500)
    },
    deleteNode(type, id) {
      if (type === 'role') {
        const index = this.rightCheckedList.role.findIndex((row) => row.id === id)
        this.rightCheckedList.role.splice(index, 1)
        const newIds = this.rightCheckedList.role.map((item) => item.id)
        this.$refs.role.setCheckedKeys([...newIds])
      } else {
        const index = this.rightCheckedList.user.findIndex((row) => row.id === id)
        if (index !== -1) {
          this.rightCheckedList.user.splice(index, 1)
        } else {
          const index1 = this.rightCheckedList.dept.findIndex((row) => row.id === id)
          this.rightCheckedList.dept.splice(index1, 1)
        }
        const newIds = [
          ...this.rightCheckedList.user.map((item) => item.id),
          ...this.rightCheckedList.dept.map((item) => item.id)
        ]
        this.$refs.user.setCheckedKeys([...newIds])
      }
    },
    async queryUserList() {
      const res = await queryUserList()
      const resData = res.data.data
      if (resData) {
        this.roleData = resData.map.role.map((item) => {
          return {
            id: item.id,
            name: item.name,
            type: item.flag,
            children: []
          }
        })
        this.data = resData.root.children
        this.init()
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    clearAll() {
      this.rightCheckedList = this.$options.data().rightCheckedList
      this.$refs.user.setCheckedKeys([])
      this.$refs.role.setCheckedKeys([])
    },
    // 树选择的回调
    checkChange(node, data) {
      const dept = data.checkedNodes
        .filter((e) => e.type === 'dept')
        .map((item) => {
          return {
            id: item.id,
            label: item.name,
            name: item.name,
            type: 'dept',
            roleRange: this.roleRange
          }
        })
      const user = data.checkedNodes
        .filter((e) => e.type === 'user')
        .map((item) => {
          return {
            id: item.id,
            label: item.name,
            name: item.name,
            type: 'user',
            roleRange: this.roleRange
          }
        })
      this.rightCheckedList = {
        ...this.rightCheckedList,
        dept,
        user
      }
    },
    checkRoleChange(node, data) {
      const role = data.checkedNodes.map((item) => {
        return {
          id: item.id,
          label: item.name,
          name: item.name,
          type: 'role',
          roleRange: this.roleRange
        }
      })
      this.rightCheckedList = {
        ...this.rightCheckedList,
        role
      }
    },
    changeTabType(type) {
      if (type !== this.active) {
        this.active = type
      }
    },
    disableDept(node) {
      return this.onlyUser && node.type === 'dept'
    },
    getOrgList() {
      getOrgTree({ deptId: this.nowDeptId, type: this.type })
        .then((rsp) => {
          this.nodes = rsp.data
          this.selectToLeft()
        })
        .catch((err) => this.$message.error(err.response.data))
    },
    getShortName(name) {
      if (name) {
        return name.length > 2 ? name.substring(1, 3) : name
      }
      return '**'
    },
    // searchUser() {
    //   let userName = this.search.trim()
    //   this.searchUsers = []
    //   getUserByName({userName: userName}).then(rsp => {
    //     this.searchUsers = rsp.data
    //     this.selectToLeft()
    //   }).catch(err => this.$message.error("接口异常"))
    // },
    selectToLeft() {
      const nodes = this.search.trim() === '' ? this.nodes : this.searchUsers
      nodes.forEach((node) => {
        for (let i = 0; i < this.select.length; i++) {
          if (this.select[i].id === node.id) {
            node.selected = true
            break
          } else {
            node.selected = false
          }
        }
      })
    },
    selectChange(node) {
      if (node.selected) {
        this.checkAll = false
        for (let i = 0; i < this.select.length; i++) {
          if (this.select[i].id === node.id) {
            this.select.splice(i, 1)
            break
          }
        }
        node.selected = false
      } else if (!this.disableDept(node)) {
        node.selected = true
        const nodes = this.search.trim() === '' ? this.nodes : this.searchUsers
        if (this.single) {
          nodes.forEach((nd) => {
            if (node.id !== nd.id) {
              nd.selected = false
            }
          })
        }
        if (node.type === 'dept') {
          if (this.single) {
            this.select = [node]
          } else {
            this.select.unshift(node)
          }
        } else if (this.single) {
          this.select = [node]
        } else {
          this.select.push(node)
        }
      }
    },
    noSelected(index) {
      let { nodes } = this
      for (let f = 0; f < 2; f++) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === this.select[index].id) {
            nodes[i].selected = false
            this.checkAll = false
            break
          }
        }
        nodes = this.searchUsers
      }
      this.select.splice(index, 1)
    },
    handleCheckAllChange() {
      this.nodes.forEach((node) => {
        if (this.checkAll) {
          if (!node.selected && !this.disableDept(node)) {
            node.selected = true
            this.select.push(node)
          }
        } else {
          node.selected = false
          for (let i = 0; i < this.select.length; i++) {
            if (this.select[i].id === node.id) {
              this.select.splice(i, 1)
              break
            }
          }
        }
      })
    },
    getAvatarColor() {
      Math.floor(Math.random() * 10)
      return this.avatarColor[0]
    },
    nextNode(node) {
      this.nowDeptId = node.id
      this.navNodes.push(node)
      this.getOrgList()
    },
    beforeNode() {
      if (this.navNodes.length === 0) {
        this.$message.warning('已经是最上一级喽')
        return
      }
      if (this.navNodes.length < 2) {
        this.nowDeptId = null
      } else {
        this.nowDeptId = this.navNodes[this.navNodes.length - 2].id
      }
      this.navNodes.splice(this.navNodes.length - 1, 1)
      this.getOrgList()
    },
    recover() {
      // this.select = []
      // this.nodes.forEach(nd => nd.selected = false)
      this.clearAll()
    },
    selectOk() {
      this.$emit('selectOver', { ...this.rightCheckedList })
      this.recover()
    },
    close() {
      this.$emit('close')
      this.recover()
    },
    init() {
      this.checkAll = false
      this.nowDeptId = null
      this.navNodes = []
      this.navNodePointer = null
      // this.select = Object.assign([], this.selected)
      this.$nextTick(() => {
        this.$refs.user.setCheckedNodes(this.selected)
        this.$refs.role.setCheckedNodes(this.selected)
        this.rightCheckedList = {
          dept: this.selected.filter((e) => e.type === 'dept'),
          user: this.selected.filter((e) => e.type === 'user'),
          role: this.selected.filter((e) => e.type === 'role')
        }
      })
      // this.selectToLeft()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  z-index: 99999;
  padding: 20px 40px 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(67, 67, 67, 0.1);

  .el-dialog__header {
    background: #ffffff;
  }
  .el-dialog__title {
    font-size: 16px;
    font-weight: 700;
  }

  .el-dialog__body {
    padding-top: 0;
  }

  .el-dialog__footer {
    margin-top: 400px;
  }
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 290px;
  height: 35px;
  padding: 0 10px;
  margin-left: 6px;
  line-height: 35px;
  &:hover {
    background: #ffffff;
  }
  .avt {
    width: 33px;
    height: 33px;
    text-align: center;
    display: inline-block;
    font-size: 5px;
    border-radius: 50%;
    color: #ffffff;
  }
  .el-icon-close {
    cursor: pointer;
  }
  i:first-child {
    font-size: large;
  }

  .next-dept {
    cursor: pointer;
    float: right;
    color: #38adff;
  }

  .next-dept-disable {
    //pointer-events: none;
    cursor: not-allowed;
    float: right;
    color: #cccccd;
  }
}

.picker {
  .check-desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    height: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--gray-gray-4, #e5e6eb);
    margin-bottom: 8px;
    .clear {
      display: flex;
      // align-items: center;
      color: #2d5cf6;
      cursor: pointer;
    }
    .can-clear {
      color: #86909c;
    }
    svg,
    i {
      width: 18px;
      height: 18px;
    }
  }

  /deep/ .box {
    padding: 10px;
    height: 400px;
    width: 340px;
    border-radius: 5px;
    border: 1px solid #d4d4d5;

    .el-breadcrumb {
      margin: 10px 0;
    }
    .is-active {
      color: #2d5cf6;
    }
    .tabs {
      display: flex;
      align-items: center;
      gap: 20px;
      height: 22px;
      margin-bottom: 10px;
      .tab {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      i {
        font-size: 18px;
      }
    }
    .el-checkbox .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background: #2d5cf6;
    }
    .right-item-box {
      padding: 8px;
      border-radius: 4px;
      background: #f7f8fa;
      margin-bottom: 8px;
      .title {
        font-weight: 700;
      }
    }
  }
  .right-box {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }
  .left-box {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

::-webkit-scrollbar {
  float: right;
  width: 4px;
  height: 4px;
  background-color: #f8f8f8;
}

::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #e8e8e8;
}
</style>
<style lang="less">
.el-dialog {
  padding: 20px 40px 10px;
}
</style>
