document.addEventListener("DOMContentLoaded", ()=>{
    let dogBar = document.querySelector("#dog-bar")
    let dogInfo =  document.querySelector("#dog-info")
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let btn = document.createElement('button')
    let filterBtn = document.querySelector("#good-dog-filter")
    dogInfo.appendChild(img)
    img.src = ""
    dogInfo.appendChild(h2)
    h2.textContent = ""
    dogInfo.appendChild(btn)
    btn.textContent= ""
    dogInfo.style.display = "none"

    
    

    fetch(' http://localhost:3000/pups')
    .then(res=>res.json())
    .then(res=>{
        for(let obj of res){
            let span = document.createElement('span');
            span.textContent = obj.name;
            dogBar.append(span);      
                        
        }
        let span = document.querySelectorAll('span');
        for(let el of span){
            el.addEventListener('click', ()=>{
            fetch(' http://localhost:3000/pups')
            .then(res=>res.json())
            .then(arr=>{
                for(let obj of arr){
                    if(obj.name === el.textContent){
                        img.src = obj.image
                        h2.textContent = obj.name
                        if(obj.isGoodDog === true){
                            btn.textContent = "Good Dog"
                        }
                        else{
                            btn.textContent = "Bad Dog"
                        }
                        btn.addEventListener("click", ()=>{
                            if(btn.textContent === 'Good Dog'){
                                btn.textContent = 'Bad Dog'
                                fetch(`http://localhost:3000/pups/${obj.id}`, {
                                'method' : 'PATCH',
                                'headers': {'Content-Type': 'application/json'},
                                'body': JSON.stringify({isGoodDog : false})
                            })
                            }
                            else{
                                btn.textContent = 'Good Dog'
                                fetch(`http://localhost:3000/pups/${obj.id}`, {
                                'method' : 'PATCH',
                                'headers': {'Content-Type': 'application/json'},
                                'body': JSON.stringify({isGoodDog : true})
                            })
                            }
                            
                            
            
            
                        })     
                        
                    }
                
                }

            })

            dogInfo.style.display = "block"
           
        
        })
 }

        

    })

    
   
})