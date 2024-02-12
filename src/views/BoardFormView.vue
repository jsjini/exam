<template>
    <div class="container">
      <h3 class="text-center">{{ title }}</h3>
      <div class="row">
        <table class="table">
          <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">
              <input class="form-control" type="number" v-model="boardInfo.no" readonly>
            </td>
          </tr>
          <tr>
            <th class="text-right table-primary">제목</th>
            <td class="text-center">
              <input class="form-control" type="text" v-model="boardInfo.title">
            </td>
          </tr>
          <tr>
            <th class="text-right table-primary">작성자</th>
            <td class="text-center">
              <input class="form-control" type="text" v-model="boardInfo.writer">
            </td>
          </tr>
          <tr>
            <th class="text-right table-primary">내용</th>
            <td class="text-center">
              <input class="form-control" type="text" v-model="boardInfo.content">
            </td>
          </tr>
          <tr>
            <th class="text-right table-primary">작성일자</th>
            <td class="text-center">
              <input class="form-control" type="date" v-model="boardInfo.created_date" v-bind:readonly="!isUpdated"> <!-- yyyy-MM-dd -->
            </td>
          </tr>
        </table>
      </div>
      <div class="row">
        <button class="btn btn-info" @click="isUpdated ? updateInfo() : insertInfo()">저장</button>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        boardInfo: {
          no: null,
          writer: "",
          title: "",
          content: "",
          created_date: null,
          updated_date: null
        },
        searchNo: null,
        isUpdated: false
      }
    },
    computed: {
      title() {
        return this.isUpdated ? '게시글 수정' : '게시글 등록';
      }
    },
    created() {
      this.searchNo = this.$route.query.no;
      console.log(this.searchNo);
      if (this.searchNo != null && this.searchNo != undefined) {
        this.getBoardInfo();
      } else {
        this.boardInfo.created_date = this.getDate('');
      }
    },
    methods: {
      async getBoardInfo() {
        let result = await axios.get('/api/board/' + this.searchNo)
          .catch(err => console.log(err));
        console.log(result);
        let info = result.data;
  
        let newDate = this.getDate(info.created_date);
        info.created_date = newDate;
  
        this.boardInfo = info;
        this.isUpdated = true;
      },
      insertInfo() {
        if (!this.validation()) return;
  
        let data = {
          "param": {
            title: this.boardInfo.title,
            writer: this.boardInfo.writer,
            content: this.boardInfo.content,
            created_date: this.boardInfo.created_date
          }
        }
  
        axios
          .post('/api/board', data)
          .then(result => {
            let no = result.data.insertId;
            if (no == 0) {
              alert(`등록되지 않았습니다.\n내용을 확인해주세요`)
            } else {
              alert(`정상적으로 등록되었습니다.`);
              this.boardInfo.no = no;
            }
          })
          .catch(err => console.log(err));
  
      },
      updateInfo() {
        if (!this.validation()) return;
  
        let data = {
          "param": {
            title: this.boardInfo.title,
            writer: this.boardInfo.writer,
            content: this.boardInfo.content,
            created_date: this.boardInfo.created_date
          }
        };
  
        axios
          .put(`/api/board/${this.boardInfo.no}`, data)
          .then(result => {
            let count = result.data.changedRows;
            if (count == 0) {
              alert(`수정되지 않았습니다.\n내용를 확인해주세요`)
            } else {
              alert(`정상적으로 수정되었습니다.`);
              this.$router.push({ path: '/boardInfo', query: {'no' : this.boardInfo.no}});
            }
          })
          .catch(err => console.log(err));
  
      },
      validation() {
        
        return true;
      },
      getSendData() {
        let obj = this.boardInfo;
        let delData = ["no"];
        let newObj = {};
  
        let isTargeted = null;
        for (let field in obj) {
          isTargeted = false;
          for (let target of delData) {
            if (field == target) {
              isTargeted = true;
              break;
            }
          }
          if (!isTargeted) {
            newObj[field] = obj[field];
          }
        }
        let newData = {
          "param": newObj
        }
        return newData;
      },
      getDate(value) {
        if (value == null) return null;
        let date = value == '' ? new Date() : new Date(value);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      }
    }
  }
  </script>