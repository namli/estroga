<template>
<div class="min-h-screen flex flex-col ">
    <div class="p-4 absolute flex  top-1 right-1 text-gray-500 text-sm font-semibold uppercase tracking-widest">
      <div v-if="user">
        <router-link class="px-6 " :to="{ name: 'home' }">
          Home
        </router-link>
      </div>
      <div v-else>
        <router-link class="px-6 " :to="{ name: 'login' }">
          Login
        </router-link>
        <router-link class="p-2 mr-4" :to="{ name: 'register' }">
          Register
        </router-link>
      </div>
    </div>

<div class="flex-1 flex flex-col items-center justify-center text-gray-600 ">
        <form class="md:w-6/12 md:p-4 w-full mx-auto" @submit.prevent="findCode">
                        <div class=" w-full my-1 py-2 sm:flex  sm:items-center sm:justify-between">
                            <label for="code" class="w-4/12 "> Code </label>
                            <input type="text" v-model="code" name="code" class="border border-gray-300 bg-white sm:w-8/12 w-full p-2 mt-3 sm:mt-0 focus:outline-none rounded-sm">
                        </div>
                        <div class=" w-full my-1 py-2 sm:flex sm:items-center sm:justify-end">
                            <div class="sm:w-8/12 w-full  flex justify-between items-center mt-3 sm:mt-0">
                                <div v-if="busy"  class="flex justify-center items-center p-2 px-6 rounded-sm text-white bg-blue-500 hover:bg-blue-600"> 
                                   <circle-svg class="w-6 h-6" />
                                </div>
                                <button v-else type="submit" class="p-3 rounded-sm text-white bg-blue-500 hover:bg-blue-600">Search</button>
                            </div>
                        </div>
                         <div v-if="code">
                         {{code}}
                         </div>
                    </form>
                    </div>
  </div>

</template>


<script>
export default {
    data() {
        return {
            auth : true 
        }
    },
    computed : {
      user() {
        return this.$store.getters.user;
      },
      code(){
      return this.$store.getters.code;
      }
    },
    methods : {
        async findCode(){
            this.busy = true ;
            try {
                await this.$store.dispatch('getCode' , {'code' : this.code })
            }
            catch (e){
                this.errors = e.data
            };
            this.busy = false ;
            
        }
    },
}
</script>
