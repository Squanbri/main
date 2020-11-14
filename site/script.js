axios.get('http://localhost:3000/').then( response => {  a = response.data;
  document.getElementById('categories').innerHTML += '<li class="list-group-item active"' + "id=" + a[0].id + '>' + a[0].title + '</li>';
  for(let i = 1; i < a.length; i++) document.getElementById('categories').innerHTML += '<li class="list-group-item"' + "id=" + a[i].id + '>' + a[i].title + '</li>';
})
axios.get('http://localhost:3000/competencies').then( response => { b = response.data;
  document.getElementById('competencies').innerHTML += '<li class="list-group-item active"' + "id=" + b[0].id + '>' + b[0].title + '</li>';
  for (let i = 1; i < b.length; i++)
    if(b[i].category_id == 1) document.getElementById('competencies').innerHTML += '<li class="list-group-item"' + "id=" + b[i].id + '>' + b[i].title + '</li>';
})

axios.get('http://localhost:3000/skills').then( response => { c = response.data;
   for (let i = 0; i < c.length; i++)
    if(c[i].competency_id == 1) document.getElementById('skills').innerHTML += '<li class="list-group-item"' + "id=" + c[i].id + '>' + c[i].title + '</li>';
})
//////////////////////////////////////////////////
var a, b, c;
var competency = 1;
var selectSkills = [];
const feedbackMessage = document.getElementById("feedbackMessage")

function Send(){
  const fio = document.getElementsByName("Fio")[0].value
  const phone = document.getElementsByName("Tel")[0].value
  const company = document.getElementsByName("Comp")[0].value
  const comment = document.getElementsByName("Comm")[0].value

  let selSkills = "";
  for(let i = 0; i < selectSkills.length; i++){
    selSkills += selectSkills[i] + "; ";
  }

  const params = {
    form: {
      fio: fio,
      phone: phone,
      company: company,
      comment: comment,
      skills: selSkills
    }
  }
  console.log(
    params
  )
  axios.post('http://localhost:3000/forms', params)
    .then(response => {
      feedbackMessage.innerHTML = "Success"
    })
    .catch(error => {
      feedbackMessage.innerHTML = "Fail";
    });
}

//  Категории //
document.getElementById('categories').onclick = function(event){
  // setUp //
  document.getElementById('competencies').innerHTML = "";

  for(let i = 0; i < document.getElementById('categories').childNodes.length; i++)
    document.getElementById('categories').childNodes[i].className = "list-group-item";
  //////////

  document.getElementById(event.target.id).className = "list-group-item active"

  let k = 0;
  for(let i = 0; i < b.length; i++)
    if(b[i].category_id == event.target.id)
      if(k != 0) document.getElementById('competencies').innerHTML += '<li class="list-group-item"' + "id=" + b[i].id + '>' + b[i].title + '</li>';
      else{
        document.getElementById('competencies').innerHTML += '<li class="list-group-item active"' + "id=" + b[i].id + '>' + b[i].title + '</li>';

        document.getElementById('skills').innerHTML = "";
        let select = false;
        for(let j = 0; j < c.length; j++)
          if(c[j].competency_id == b[i].id){
            for(let k = 0; k < selectSkills.length; k++){
              if(selectSkills[k] == c[j].title) {select = true; break;}
              else select = false;
            }
            if(select)document.getElementById('skills').innerHTML += '<li class="list-group-item active d-flex justify-content-between align-items-center"' + "id=" + c[j].id + '>' + c[j].title + '<span class="badge badge-success badge-pill">&nu;</span>' + '</li>';
            else document.getElementById('skills').innerHTML += '<li class="list-group-item"' + "id=" + c[j].id + '>' + c[j].title + '</li>';
            // document.getElementById('skills').innerHTML += '<li class="list-group-item"' + "id=" + c[j].id + '>' + c[j].title + '</li>';
          }
        k++;
      }
}

// Компетенции //
document.getElementById('competencies').onclick = function(event){
  // setUp //
  document.getElementById('skills').innerHTML = "";

  for(let i = 0; i < document.getElementById('competencies').childNodes.length; i++)
    document.getElementById('competencies').childNodes[i].className = "list-group-item";
  //////////

  // Click //
  for(let i = 0; i < document.getElementById('competencies').childNodes.length; i++)
    if(document.getElementById('competencies').childNodes[i].id == event.target.id)
      document.getElementById('competencies').childNodes[i].className = "list-group-item active";
  ///////////

  // Out skills //

  competency = event.target.id;
  console.log(competency);
  let select = false;
  for(let i = 0; i < c.length; i++)
    if(c[i].competency_id == event.target.id){
      for(let j = 0; j < selectSkills.length; j++){
        if(selectSkills[j] == c[i].title){ select = true; break;}
        else select = false;
      }
      if(select) document.getElementById('skills').innerHTML += '<li class="list-group-item active d-flex justify-content-between align-items-center"' + "id=" + c[i].id + '>' + c[i].title + '<span class="badge badge-success badge-pill">&nu;</span>' + '</li>';
      else document.getElementById('skills').innerHTML += '<li class="list-group-item"' + "id=" + c[i].id + '>' + c[i].title + '</li>';
    }
  ////////////////
}

// Способности //
document.getElementById('skills').onclick = function(event){
  // setUp //
  for(let i = 0; i < document.getElementById('skills').childNodes.length; i++)
    if(document.getElementById('skills').childNodes[i].id == event.target.id)
      if(document.getElementById('skills').childNodes[i].className != "list-group-item"){
        document.getElementById('skills').childNodes[i].className = "list-group-item";
        document.getElementById('skills').childNodes[i].innerHTML = c[event.target.id-1].title;
        console.log(event.target.innerText);
        for(let j = 0; j < selectSkills.length; j++)
          if(selectSkills[j] == event.target.innerText){
            selectSkills.splice(j,1);
            document.getElementById('selects').innerHTML = "";
            for(let k = 0; k < selectSkills.length; k++)
              document.getElementById('selects').innerHTML += '<span class="box p-1 mr-3 mb-1" id="' + selectSkills[k] + '">' + selectSkills[k] + '<span class="ml-2 badge badge-pill badg" id="closed">&times;</span></span>';
          }
      }
      else{
        document.getElementById('skills').childNodes[i].className = "list-group-item active d-flex justify-content-between align-items-center";
        document.getElementById('skills').childNodes[i].innerHTML = c[event.target.id-1].title + '<span class="badge badge-success badge-pill">&nu;</span>';
        selectSkills.push(c[event.target.id-1].title);
        document.getElementById('selects').innerHTML += '<span class="box p-1 mr-3 mb-1" id="' + c[event.target.id-1].title + '">' + c[event.target.id-1].title + '<span class="ml-2 badge badge-pill badg" id="closed">&times;</span></span>';
        console.log(selectSkills);
      }
}

document.getElementById('selects').onclick = function(event){
  if(event.target.id == "closed"){
    for(let i = 0; i < selectSkills.length; i++){
      if(event.target.parentNode.id == selectSkills[i]){
         selectSkills.splice(i,1);
         document.getElementById('selects').innerHTML = "";
         for(let k = 0; k < selectSkills.length; k++) document.getElementById('selects').innerHTML += '<span class="box p-1 mr-3 mb-1" id="' + selectSkills[k] + '">' + selectSkills[k] + '<span class="ml-2 badge badge-pill badg" id="closed">&times;</span></span>';

         document.getElementById('skills').innerHTML = "";
         let select = false;
         for(let j = 0; j < c.length; j++)
           if(c[j].competency_id == competency){
             console.log("ok");
              for(let k = 0; k < selectSkills.length; k++)
                if(selectSkills[k] == c[j].title) {select = true; break;}
                else select = false;
              if(select) document.getElementById('skills').innerHTML += '<li class="list-group-item active d-flex justify-content-between align-items-center"' + "id=" + c[j].id + '>' + c[j].title + '<span class="badge badge-success badge-pill">&nu;</span>' + '</li>';
              else document.getElementById('skills').innerHTML += '<li class="list-group-item"' + "id=" + c[j].id + '>' + c[j].title + '</li>';
          }
      }
    }
  }
}
