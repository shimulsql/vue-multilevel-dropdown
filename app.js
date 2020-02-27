
var nav_items = [
    {
        id: 0,
        title: "Home",
        url: '/home',
        parent: null
    },
    {
        id: 1,
        title: "Apps",
        url: '/apps',
        parent: null
    },
    {
        id: 2,
        title: "Categories",
        url: '/categories',
        parent: null
    },
    {
        id: 3,
        title: "Web apps",
        url: '/',
        parent: 1
    },
    {
        id: 4,
        title: "Desktop Apps",
        url: '/',
        parent: 1
    },
    {
        id: 5,
        title: "Mac apps",
        url: '/',
        parent: 1
    },
    {
        id: 8,
        title: "Category 1",
        url: '/',
        parent: 2
    },
    {
        id: 9,
        title: "Category 2",
        url: '/',
        parent: 2
    },
    {
        id: 10,
        title: "Category 3",
        url: '/',
        parent: 2
    },
    {
        id: 11,
        title: "Shimul",
        url: '/',
        parent: 10
    },
    {
        id: 12,
        title: "Shimul 2",
        url: '/',
        parent: 11
    }
];


// Main menu component
Vue.component('multi-drop-nav', {
    props: ['navs'],
    data: {
        hasChildren: true
    },
    methods: {
        hasChildren: function (id) {
            return this.$root.hasChildren(id)
        }
    },
    template: `
        <ul class="dropdown-menu">
            <li v-for="nav in navs" 
            :class="{'dropdown-submenu': hasChildren(nav.id)}"
            v-if="nav.parent == null"> 
                <a v-bind:href="nav.url">
                {{ nav.title }}
                </a>
                
                <sub-menus 
                    :id = "nav.id"
                    :navs = "navs">
                </sub-menus>
            </li>
        </ul>
    `
})
// Sub menu component
Vue.component('sub-menus', {
    props: ['navs', 'id'],
    methods: {
        hasChildren: function(id){
            return this.$root.hasChildren(id)
        }
    },
    template: `
        <ul class="dropdown-menu" v-if="hasChildren(id)">
            <li v-for="nav in navs" v-if="id == nav.parent" :class="{'dropdown-submenu': hasChildren(nav.id)}">
            <a :href="nav.url">
             {{nav.title}}</a>
                <sub-menus 
                    :id = "nav.id"
                    :navs = "navs">
                </sub-menus>
            </li>
        </ul>
    `
})


var nav = new Vue({
    el: '#nav',
    data: {
        isActive : true,
        items: nav_items,
        hasChildrenItemsId: []
    },
    methods: {
        hasChildrenItem: function(){
            this.items.forEach(el => {
                if(el.parent != null){
                    this.hasChildrenItemsId.push(el.parent)
                }  
            });
        },
        hasChildren: function(id){
            if(this.hasChildrenItemsId.indexOf(id) != -1){
                return true
            }else{
                return false
            }
        }
    },
    mounted: function(){
        this.hasChildrenItem()
    }
});







