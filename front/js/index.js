var select = document.querySelector("#access-type");
var credField = document.querySelector("#credField");

// alert("connected")

select.addEventListener("click",function(){
    console.log(select.value)
    if(select.value == "customer")
    {
        credField.style.display="none";
    }
    else
    {
        credField.style.display="block";
    }
})