const postList = document.querySelector("#postList");
const postTitle = document.querySelector("#postTitle");
const postBody = document.querySelector("#postBody");
const postBtn = document.querySelector("#postBtn");

let data = [];



async function getPost(){
    try{
        const data = await fetch(`https://blog-api-t6u0.onrender.com/posts`,{
        method: "GET",
        headers:{
           "Content-Type":"application/json",
        }
    });
    const arr = await data.json();
    return arr
    }catch(err){
        console.log(err);
    }
    
}

async function getPostID(id){
    const data = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`,{
        method: "GET",
        headers:{
           "Content-Type":"application/json",
        }
    });
    const arr = await data.json();
    console.log(arr);
}


async function createPost(form){
    const data = await fetch(`https://blog-api-t6u0.onrender.com/posts`,{
        method: "POST",
        headers:{
           "Content-Type":"application/json",
        },
        body:JSON.stringify(form),
    });
    const arr = await data.json();
    return arr
}


async function updatePost(id,form){
    const data = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`,{
        method: "PUT",
        headers:{
           "Content-Type":"application/json",
        },
        body:JSON.stringify(form),
    });
    const arr = await data.json();
    console.log(arr);
}


async function deletePost(id){
    const data = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`,{
        method: "DELETE",
        headers:{
           "Content-Type":"application/json",
        },
        
    });
    const arr = await data.json();
    console.log(arr);
}






function renderElements(data){
    
    postList.innerHTML = data.map((post)=>`
    <div class="card text-start">
    <img class="card-img-top object-fit-cover" height="200" src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/09/instagram-image-size.jpg" alt="Title" />
    <div class="card-body">
        <h4 class="card-title">${post.title}</h4>
        <p class="card-text">${post.body}</p>
        <button class="btn btn-danger">Delete</button>
    </div>`).join("")
}

postBtn.addEventListener("click", async function(){
    const title = postTitle.value;
    const body = postBody.value;

    const form = {
        title,
        body,
    };
    const newPost = await createPost(form);
    data = [newPost, ...data];

    renderElements(data);
 
})

async function app(){
    const posts = await getPost();
    data = posts
    renderElements(posts)
}


app()
