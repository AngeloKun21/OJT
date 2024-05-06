import { defineNuxtRouteMiddleware, abortNavigation, navigateTo, useNuxtApp, createError, useCookie } from "nuxt/app"
import { useRouter } from "vue-router";
//import { cookietoken } from "~/composables/interface/interface";
import { ref } from 'vue'


export default defineNuxtRouteMiddleware(async (to, from) => {

    if (import.meta.client){
        const route = useRouter()
        const userId = ref();
        const storedId = sessionStorage.getItem('targetedID');
        const admin_check = ref<boolean>();
        if(storedId){
            console.log("Stored ID:", storedId); // Check the value retrieved from sessionStorage
            userId.value = storedId ? JSON.parse(storedId) : null;
            console.log("User ID:", userId.value); // Check the value after parsing 
            
            const user = await fetch("http://localhost:5000/users/" + userId.value, {
                method: "GET",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTUsImRhdGUiOiIyMDI0LTA0LTAxVDIzOjE3OjA2LjA1OFoiLCJpYXQiOjE3MTIwMTM0MjYsImV4cCI6MTcxMjAxNTIyNn0.1fi4LqhYq3NQNk9Z0xj2L19FU0Ky3hEECjRcvNPFWeA`
                },
            }).then((res) => res.json());
            if(user){
                admin_check.value = user.usertypeadmin
                console.log("TEST usertypeadmin value ==>>", admin_check.value)
                console.log(user)
                console.log("TEST USER ==>>")
                console.log("admin check", admin_check.value)
                if(admin_check.value){
                    if(to.path.includes("/user")){
                        route.push("/app/invalid")
                    }
                }else if(admin_check.value === false){
                    if(to.path.includes("/admin")){
                        route.push("/app/invalid")
                    }
                }
            }
            
        } 
    }
    

    

    /*
    if(sessionStorage === null){
        route.push("/")
    }else{
        if(admin_check){
            if(to.path.includes("/admin")){
                if(to.path !== `/admin/profile/` || to.path !== `/admin/dashboard/` || to.path !== `/admin/accountManage/`){
                    route.push("/invalid")
                  }
            }
        }else{
            if(to.path.includes("/user")){
                if(to.path !== `/user/userprofile/` || to.path !== `/user/userdashboard/`){
                    route.push("/invalid")
                  }
            }
        }
    }
    
    const authtoken = useCookie<cookietoken | null>("users")
    if(authtoken.value){
      const authaccess = authtoken.value.data.account !== "ADMIN" ?"/admin/Dashboard/userpage" : "/admin/Dashboard/" 
      if(to.path.includes("/Profile")){
        if(to.path !== `/admin/Profile/${authtoken.value.data.id}`){
          route.push("/error")
        }
      }
      if(to.path.includes("/User") && authtoken.value.data.account !== "ADMIN"){
        route.push("/error")
      }
      if(to.path.includes("/auth")){
        route.push(authaccess)
      }
      
      if(to.path.includes("/Dashboard")){
        if(to.path !== authtoken){
          throw createError({ statusCode: 403 , statusMessage: 'Lack of Authorization' })
        }
      }
      
    }else{
      if(to.path.includes("/admin")){
        route.push("/error")
      }
    }
    */
  
  })