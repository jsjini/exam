<template>
    <table>
        <tbody>
            <tr v-for="(comment, idx) in commentList" v-bind:key="idx">
                <td>{{ comment.content }}</td>
                <td>{{ comment.writer }}</td>
                <td>{{ createdDate(comment.created_date) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
        commentList : []
        }
    },
    props: ['bno'],
    created() {
        this.getCommentList(this.bno); 
    },
    methods : {
        async getCommentList(bno) {
        let result = await axios.get('/api/comment/' + bno)
                            .catch(err => console.log(err));
        console.log(result);
        let list = result.data;
        this.commentList = list;
        },
        createdDate(createdDate) {
            let result = null;
            if(createdDate != null){
                let date = new Date(createdDate);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);
                result = `${year}-${month}-${day}`
            }
            return result
        }
    }
}
</script>
