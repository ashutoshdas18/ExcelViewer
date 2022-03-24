    let data,z;
    let value;
    let form = document.querySelector('form')
    let file = document.querySelector('#file')
    let table = document.querySelector('table')
    let block = document.querySelector('.block')
    let labelpara = document.querySelector('.labelpara')
    
    form.addEventListener('submit',e=>{
        e.preventDefault()
        block.style.display="block"
        data = new window.FormData(form)
        axios.post("/posted", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(recieved=>{
        file.value=null;
        labelpara.innerText = "Select your .xslx file"
        value = recieved.data
        block.style.display="none";
        let tr = document.createElement('tr')
        tr.className="header"
        table.appendChild(tr)
        for(let i of Object.keys(value[0])){
          let th = document.createElement('th')
          th.innerHTML = i
          tr.appendChild(th)
        }
        value.forEach(e=>{
          let tr = document.createElement('tr')
          table.appendChild(tr)
          for(let i of Object.values(e)){
            let td = document.createElement('td')
            td.innerHTML=i
            tr.appendChild(td)
          }
        })


      }).catch(e=>{
        block.style.display="none";
      })
    })
    file.addEventListener('change',e=>{
      z=e.target.value.split('\\')[2]
      document.querySelector('.labelpara').innerText = z
      
    })