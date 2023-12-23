    setupui()
const base = "https://tarmeezAcademy.com/api/v1"
axios.get(`${base}/posts`)
.then((Response) => { 
    const posts = Response.data.data
    // console.log(posts);
    // console.log(Response);

    document.getElementById("posts").innerHTML = ""

    for(post of posts) { 

        // console.log(post);
        let author = post.author
        let content = `
        <div class="card  pad mb-5 ">
                <div class="card">
                    <div class="card-header">
                        <img src="${author.profile_image}" alt="" class="rounded-circle border border-2 p-1">
                        <b> ${author.username}</b>
                    </div>
                    <div class="card-body">
                        <img src="${post.image}" alt="" class="w-100">
                        <h6>${post.created_at}</h6>
                        <h5>${post.title}</h5>
                        <p>${post.body}</p>
                        <hr>
                        <div>
                            <i class="fa-regular fa-comment-dots"></i>
                            <span>(${post.comments_count}) comments</span>
                            <span id="post-tags-${post.id}"></span>
                        </div>
                    </div>
                </div>
        </div>
        `

        document.getElementById("posts").innerHTML += content

        const current = `post-tags-${post.id}`
        document.getElementById(current).innerHTML = ""

        for(tag of post.tags) {
            let tagscontent = 
            `
                <button> ${tag.name} </button>
            `
            document.getElementById(current).innerHTML += tagscontent
        }
    }   
})
// axios.get(`${base}/posts`)
// .then((Response) => { 
//     const posts = Response.data.data
//     // console.log(posts);
//     // console.log(Response);

//     document.getElementById("posts").innerHTML = ""

//     for(post of posts) { 

//         // console.log(post);
//         let author = post.author
//         let content = `
//         <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
//                 <div class="card">
//                     <div class="card-header">
//                         <img src="${author.profile_image}" alt="" class="rounded-circle border border-2 p-1">
//                         <b> ${author.username}</b>
//                     </div>
//                     <div class="card-body">
//                         <img src="${post.image}" alt="" class="w-100">
//                         <h6>${post.created_at}</h6>
//                         <h5>${post.title}</h5>
//                         <p>${post.body}</p>
//                         <hr>
//                         <div>
//                             <i class="fa-regular fa-comment-dots"></i>
//                             <span>(${post.comments_count}) comments</span>
//                             <span id="post-tags-${post.id}"></span>
//                         </div>
//                     </div>
//                 </div>
//         </div>
//         `

//         document.getElementById("posts").innerHTML += content

//         const current = `post-tags-${post.id}`
//         document.getElementById(current).innerHTML = ""

//         for(tag of post.tags) {
//             let tagscontent = 
//             `
//                 <button> ${tag.name} </button>
//             `
//             document.getElementById(current).innerHTML += tagscontent
//         }
//     }   
// })

function logbtn() {
    const password = document.getElementById("pass-input").value
    const user = document.getElementById("user-input").value
    const params= {
        "username" : user,
        "password" : password
    }    

    const url = `${base}/login`


    axios.post(url,params)
    .then((Response)=>{
        console.log(Response)
        localStorage.setItem("token", Response.data.token)
        localStorage.setItem("user",JSON.stringify(Response.data.user))

        const truck_modal = document.querySelector('#exampleModal');
        const modal = bootstrap.Modal.getInstance(truck_modal);    
        modal.hide();
        alertt("Hi, you log in successfuly" , 'success')
        setupui();
        setUserName(Response);
        // console.log(response.)
    })
}
function regbtn(){
    const password = document.getElementById("regpass-input").value
    const user = document.getElementById("reguser-input").value
    const name = document.getElementById("regname-input").value
    const params= {
        "username" : user,
        "name" : name,
        "password" : password
    }    

    const url = `${base}/register`


    axios.post(url,params)
    .then((Response)=>{
        // console.log(Response)
        localStorage.setItem("token", Response.data.token)
        localStorage.setItem("user",JSON.stringify(Response.data.user))

        const truck_modal = document.querySelector('#regModal');
        const modal = bootstrap.Modal.getInstance(truck_modal);    
        modal.hide();
        alertt("Nice, New User Registered Successfuly" , 'success')
        setupui();
        setUserName(Response);
    }).catch((error) => {
        const message = error.response.data.message
        alertt( message , 'danger')
    })

}
// function setUserName (Response) {
//     // let imgdiv = document.getElementById("img")
//     let userdiv = document.getElementById("username")
//     userdiv.innerHTML = `${Response.data.user.username}`
//     // imgdiv.innerHTML = `${Response.data.user.profile_image}`
// }
function logoutbtn( ) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    alertt("log out successfuly", "danger")
    setupui();
}

function setupui() {
    const token = localStorage.getItem("token")
    const loginbtn = document.getElementById("in")
    const addbtn = document.getElementById("addbtn")
    const logoutbtn = document.getElementById("out")
    if(token == null) {
        loginbtn.style.setProperty("display", "flex", "important") 
        logoutbtn.style.setProperty("display", "none", "important") 
        addbtn.style.setProperty("display", "none", "important") 
    } else {
        loginbtn.style.setProperty("display", "none", "important") 
        logoutbtn.style.setProperty("display", "flex", "important") 
        addbtn.style.setProperty("display", "flex", "important") 
    }
}

function alertt (input , state){
    const alertPlaceholder = document.getElementById('alert-log')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
    alertPlaceholder.append(wrapper)
    }    
        appendAlert(input, state)

        // todo:
        // setTimeout(() => {
        //     const alerthide = bootstrap.Alert.getOrCreateInstance('#alert-log')
        //     alerthide.close()                
        // }, 2000);
}

function createAnewPost() {
    const title = document.getElementById("post-title-input").value
    const body = document.getElementById("post-body-input").value
    const img = document.getElementById("post-img-input").files[0]

    let formData = new FormData()
    formData.append("body", body)
    formData.append("title", title)
    formData.append("image", img)

    const url = `${base}/posts`
    const token = localStorage.getItem("token")
    const headers = {
        "Content-Type" : "multipart/form-data",
        "authorization": `Barer ${token}`
    }

    axios.post(url, formData, {
        headers:{
            "Content-Type" : "multipart/form-data",
            "authorization": `Bearer ${token}`
        }
    })
    .then((Response)=>{
        alertt("New Post Has Been Created" , "success")
        const truck_modal = document.querySelector('#create-post-modal');
        const modal = bootstrap.Modal.getInstance(truck_modal);    
        modal.hide();
        location.reload();
    }).catch((error) => {
        const message = error.response.data.message
        alertt( message , 'danger')
    })    
}