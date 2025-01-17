const loadCard = async () =>
{
    const res =  await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    console.log(posts);
    displayPosts(posts);
}


const displayPosts = posts =>
{
    console.log(posts);
    posts.forEach(post =>
        {
            console.log(post)
            const postContainer = document.getElementById('post-container')
            // creating posts
            const postCard = document.createElement('div')
            postCard.classList = `card w-full  bg-base-100 shadow-xl flex lg:flex-row flex-col items-center`;
            
            postCard.innerHTML = `
            <div><figure class="px-10 pt-10">
            <img src="${post.image}" alt="Shoes" class="w-max rounded-lg"/>
            
          </figure></div>
            
          <div class="card-body items-center text-center ">
          <div class="flex lg:flex-row flex-col items-center m-2 gap-10">
             <p>#   <span>${post.category}</span> </p>
             <p>author: <span>${post.author.name}</span> </p>
          </div>
           <h2 class="card-title text-[#12132D] font-semibold text-[18px] m-2">${post.title}</h2>
           <p class="m-2">${post.description}</p>
           <!-- main -->
           <div class="flex lg:flex-row flex-col justify-between items-center gap-10"> 
             <!-- main 1-->

             <div class="flex flex-row gap-4">
               <div class="flex flex-row gap-3">
                 <span><i class="fa-solid fa-message"></i></span>
                 <p>${post.comment_count}</p>
               </div>
                 
               <div class="flex flex-row gap-3">
                 <span><i class="fa-solid fa-eye"></i></span>
                 <p id="view-count">${post.view_count}</p>
               </div>
               <div class="flex flex-row gap-3">
                 <span><i class="fa-regular fa-clock"></i></span>
                 <p id="view-count">${post.posted_time}</p>
               </div>
                 
             </div>
             <!-- main 2 -->
             <div>
               <button id="card-button" class="rounded-full bg-green-400 text-white w-16 h-8"><i class="fa-solid fa-envelope-open"></i></button>
             </div>
           </div>
         </div>
            
            `;

            postContainer.appendChild(postCard);
            showingMode(post,postCard);
            postCard.querySelector('#card-button').addEventListener('click', () => {
              const count=document.getElementById('count');

              countInc = parseInt(count.innerText);
              countInc++;
              count.innerText = countInc.toString();
              readCount(post);
          });
        })
          setTimeout(()=> toggleLoadingSpinner(false),3000)

}
const readCount = (post) =>
{
    console.log(post);
    const readpostContainer = document.getElementById('post-read-container');
    const readPost = document.createElement('div')
    readPost.classList =`card w-full bg-white shadow-xl flex flex-row items-center p-4`;
    readPost.innerHTML = `
    <h2 class="card-title text-[#12132D] font-semibold text-[18px] m-2 w-1/2">${post.title}</h2>
    <div class="flex flex-row gap-3 flex-1 justify-evenly">
                 <span><i class="fa-solid fa-eye"></i></span>
                 <p id="view-count">1,568</p>
     </div>
    `
    readpostContainer.appendChild(readPost)
}

const showingMode = (post,postCard) => {
  const showMode = postCard.querySelector('figure');
  
  const dot = document.createElement('div');
  dot.classList.add('mode');
  
  if (post.isActive) {
      dot.classList.add('green');
  } else {
      dot.classList.add('red');
  }
  
  showMode.appendChild(dot);
}
const handleSearch = async () =>
{
    console.log("clicked")
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-text')
    const searchText = searchField.value;
    console.log(searchText);
    if( searchText !== '')
    {
      try
      {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
        const data = await res.json();
        clearPost();
        
        displayPosts(data.posts);

      }
      catch(error)
      {
        console.error("oopsssssss error ashcheeeee");
      }
    }
    else {
      loadCard();
    }
}
const clearPost = () => {
  const postContainer = document.getElementById('post-container');
  postContainer.innerHTML = '';
}
const toggleLoadingSpinner = (isLoading) =>
{
  const loadingSpinner = document.getElementById('spinner')
  if(isLoading)
  {
    loadingSpinner.classList.remove('hidden')
  }
  else
  {
    loadingSpinner.classList.add('hidden')
  }
  
}
const loadLatest = async () =>
{
    const res =  await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    data.forEach(dataa =>
      {
        const latestPost = dataa;
        console.log(latestPost);
        displayLatest(latestPost)
      })
  
}
const displayLatest = latestPost =>
{
      const latest = latestPost;
      console.log(latest);
      const latestContainer = document.getElementById('latespost-Container');
      const latestCard = document.createElement('div');
      latestCard.classList = `
      card w-96 bg-base-100 shadow-xl
      `
      latestCard.innerHTML = `
      <figure class="px-10 pt-10">
      <img src="${latest.cover_image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <p class="text-left text-neutral-400"><span><i class="fa-regular fa-calendar"></i></span>
      ${latest.author?.posted_date ? latest.author.posted_date : 'No Publish Date'}</p>
      <h3 class="text-center font-bold text-[#12132D] text-xl">${latest.title}</h3>
      <p class="text-center text-neutral-400">${latest.description}</p>
      <div class="flex flex-row items-center justify-evenly gap-8 ">
        <img   class="w-20 h-20 rounded-full"  src="${latest.profile_image}" alt="">
        <div >
          <h3 class="font-bold text-[#12132D]">${latest.author.name}</h3>
          <p class="text-neutral-400">${latest.author?.designation ? latest.author.designation : 'Unknown'}
          </p>
        </div>
      </div>
    </div>
      
      `
      latestContainer.appendChild(latestCard)
}
loadCard();
loadLatest();
