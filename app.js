var list=[
 {
 	title:"吃饭睡觉",
 	isChecked:false
 },
 {
	title:"打豆豆",
	isChecked:false
 }
]



new Vue({
	el:".main",
	data:{
		list:list,
		todo:""
		
	},
	methods:{
		//添加计划
		addTodo(ev){
			this.list.push({
				// title:ev.target.value 这种方法不好，没有用到用数据更新视图的思想
				title:this.todo,
				isChecked:false
			});
			this.todo="";
		},
		//删除计划
		deleteTodo(todo){
			var index=this.list.indexOf(todo);
			this.list.splice(index,1);
		}
	}
});