const searchInput=document.getElementById("searchInput");
const searchBtn=document.getElementById("search-btn");
const bookContainer=document.getElementById("book-container");
const errorDiv=document.getElementById("error");
const resultFound=document.getElementById("resultFound");



// to check if data is available or not
const checkData=checkItem=>{
  if(checkItem!==undefined){
    return checkItem;
  }
  else{
    return " no data available";
  }
   
};

searchBtn.addEventListener("click",function(){
  const searchValue= searchInput.value;
  searchInput.value="";
  bookContainer.textContent="";
  
  
  //fetch data
  const url=`https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if( searchValue===""){
            bookContainer.textContent="";
           error.innerText="Field is empty! please Enter a book name.";
           }
      else if(data.numFound===0 && searchValue!==""){
        errorDiv.innerText="No result Found";
       
          }
      else{
        errorDiv.innerText="";
          }
      
      
      resultFound.innerHTML=`<h6>result found ${data.numFound}</h6>`
 
      data=data.docs;
       
        
      
      //error handling
         data.forEach(item => {
         const createDiv=document.createElement("div");
         createDiv.classList.add('col-md-3', 'col-12');
         const author=checkData(item.author_name);
         const year=checkData(item.first_publish_year);
         const publisher=checkData(item.publisher);
         createDiv.innerHTML=`
         
         <div class="rounded overflow-hidden border p-2">
         <img
           src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg"
           class="w-100"
           alt="Cover Page of Book"
         />
       </div>
       
       <div
         class="
           py-2
           d-flex
           justify-content-between
           align-items-center
           d-md-block
           text-md-center
         "
       >
         <h1>${item.title}</h1>
         <h6>Author Name: ${author} </h6>
         <h6>First publish Year: ${year}</h6>
         <h6>publisher: ${publisher}</h6>
         
       </div>`;
       
   
       bookContainer.appendChild(createDiv);
      
 
       
         
     });
 
    })
  
   
})

