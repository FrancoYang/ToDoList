// var list=[
//  {
//  	title:"吃饭睡觉",
//  	isChecked:false
//  },
//  {
// 	title:"打豆豆",
// 	isChecked:false
//  }
// ]



//获取localStorage中的数据
var store={
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

var list=store.fetch("plan");

//过滤
var filter={
	all:function(list){
		return list;
	},
	finished:function(list){
		return list.filter(function(item){
			return item.isChecked;
		})
	},
	unfinished:function(){
		return list.filter(function(item){
			return !item.isChecked;
		})
	}
}

var vm =new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		editorTodos:"", //记录正在编辑的数据
		beforeTitle:"", //记录编辑前的数据的title
		visibility:"all" //通过这个属性对数据进行删选，默认值为all
	},
	watch:{
		//监控list这个属性，如果它的值发生变化，就会执行下面的函数,但是这是浅监控，还不够，要用到深度监控
		// list:function(){
		// 	store.save("plan",this.list);
		// }
		list:{
			handler:function(){
				store.save("plan",this.list);
			},
			deep:true
		}
	},
	computed:{
		noCheckedLength:function(){
			return this.list.filter(function(item){
				return !item.isChecked
			}).length
		},
		filteredList:function(){
			return filter[this.visibility]?filter[this.visibility](list):list;
		}
	},
	methods:{
		//添加计划
		addTodo(){
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
		},
		//编辑计划
		editorTodo(todo){
			this.editorTodos=todo;
			this.beforeTitle=todo.title; // 记录编辑前的title
		},
		editorTodoed(todo){
			this.editorTodos="";
		},
		//取消编辑
		cancelTodo(todo){
			todo.title=this.beforeTitle;
			this.beforeTitle="";
			this.editorTodos="";
		}
	},
	//自定义指令
	directives:{
		"focus":{
			update(el,binding){
				if(binding.value){
					el.focus();
				}
			}
		}
	}
	
});

function watchHashChange(){
	var hash=window.location.hash.slice(1); //去掉#
	vm.visibility=hash;
}

watchHashChange();

window.addEventListener("hashchange",watchHashChange);