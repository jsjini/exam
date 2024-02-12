<!-- BoardInfoView.vue -->
<template>
    <div class="container">
      <div class="row">
        <table class="table">
          <tr>
            <th class="text-center table-primary">번호</th>
            <td class="text-center">{{ boardInfo.no }}</td>
            <th class="text-center table-primary">작성일</th>
            <td class="text-center">{{ createdDate }}</td>
            <th class="text-center table-primary">이름</th>
            <td class="text-center">{{ boardInfo.writer }}</td>
          </tr>
          <tr>
            <th colspan="2" class="text-center table-primary">제목</th>
            <td colspan="4">{{ boardInfo.title }}</td>
          </tr>
          <tr>
            <td colspan="6" class="content">{{ boardInfo.content }}</td>
          </tr>
        </table>
      </div>
      <br>
      <div class="row">
        <button class="btn btn-info" @click="goToUpdate(boardInfo.no)">수정</button>
      </div>
      <br>
      <div class="row" v-if="count == 0">
        <h5 style="border: 1px solid #000;">댓글 없음</h5>
      </div>
      <div class="row" v-if="count != 0">
        <h5>댓글 목록</h5>
        <br>
        <CommentListView v-bind:bno="boardNo"/>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import CommentListView from "./CommentListView.vue";
  
  export default {
    data() {
      return {
        boardInfo: {},
        boardNo: this.$route.query.no,
        count: this.$route.query.count
      }
    },
    components: {
        CommentListView
    },
    computed: {
      createdDate() {
        let result = null;
        if(this.boardInfo.created_date != null){
          let date = new Date(this.boardInfo.created_date);
          let year = date.getFullYear();
          let month = ('0' + (date.getMonth() + 1)).slice(-2);
          let day = ('0' + date.getDate()).slice(-2);
  
          result = `${year}-${month}-${day}`
        }
        return result
      }
    },
    created() {
      let searchNo = this.$route.query.no;
      this.getBoardInfo(searchNo);
    },
    methods : {
      async getBoardInfo(no) {
        let result = await axios.get('/api/board/' + no)
                                .catch(err => console.log(err));
        let info = result.data;
        this.boardInfo = info; 
      },
      goToUpdate(no) {
        this.$router.push({ path: '/boardForm', query: {'no' : no}});
      }
    }
  }
  </script>
  
  <style>
  table, th, td {
    border: 1px solid #ccc;
  }
  th {
    background-color: skyblue;
  }
  .content {
    height: 100px;
    text-align: left;
  }
  </style>