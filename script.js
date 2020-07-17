let slider = document.getElementById('myRange');
let sizeOfArray = slider.value;
let table = document.getElementById('myTable');
let dropdown = document.getElementById('dropdown');
let valueStart = document.getElementById('value-start');
let array = generateArray();
let valueToBeSearched = document.getElementById('valueToBeSearched');
let visitedColor = "#3282b8";
let foundColor = "#ffa41b";
let currentColor = "red";
let elementFound = false;
let para = document.getElementById('para');
let elements = [slider , dropdown , document.getElementById('generateArrayButton') , valueToBeSearched , document.getElementById('start')];

generateTable();


function disable(){
    for(let i=0;i<elements.length;i++){
        elements[i].disabled = true;
        elements[i].style["color"] = "red";
    }
}
function enable(){
    for(let i=0;i<elements.length;i++){
        elements[i].disabled = false;
        elements[i].style["color"] = "black";
    }
}

function generateArray(){

    let a = [];
    for(let i=0;i<sizeOfArray;i++){
        let randomValue = Math.floor((Math.random() * 100) + 1);
        a.push(randomValue);
    }

    a.sort((a,b) => a-b);
    console.log(a);
    return a;
}

function generateTable(){
    para.innerHTML = "";
    let tableData = "<tr>";

    for(let i=0;i<sizeOfArray;i++){
        tableData += "<td>" + array[i] + "</td>";
    }

    tableData += "</tr>";
    table.innerHTML = tableData;
}

slider.addEventListener('change' , function(){
    sizeOfArray = slider.value;
    array = generateArray();
    generateTable();
});

function generateNewArray(){
    array = generateArray();
    generateTable();
}


dropdown.addEventListener("input" , function(){
    valueStart.style["visibility"] = "visible";
});


function searchingStart(){
    valueToBeSearched = document.getElementById('valueToBeSearched').value;


    if(valueToBeSearched != ""){

        for(let i=0;i<sizeOfArray;i++){
            let cell = table.rows.item(0).cells.item(i);
            cell.style["background-color"] = "green";
        }

        if(dropdown.value === "LinearSearch"){
            LinearSearch();
        }
        else if(dropdown.value === "BinarySearch"){
            BinarySearch();
        }
    }
}

function animate(animation){
    disable();
    for(let i=0;i<animation.length;i++){
        setTimeout(function(){
            let pos = animation[i][0];
            let color = animation[i][1];

            let cell = table.rows.item(0).cells.item(pos);
            cell.style["background-color"] = color;

            if(i+1 == animation.length){
                if(elementFound){
                    document.getElementById('para').innerHTML = "Element Found at Position: " + (pos + 1);
                } else {
                    document.getElementById('para').innerHTML = "Element Not Found";
                }
                setTimeout(function(){
                    enable();
                },200);
            }
        }, i*1000);
    }
}

function LinearSearch(){
    let animation = [];
    elementFound = false;

    for(let i=0;i<sizeOfArray && !elementFound;i++){
        animation.push([i , currentColor]);

        if(array[i] == valueToBeSearched){
            elementFound = true;
            animation.push([i , foundColor]);
        } else {
            animation.push([i , visitedColor]);
        }
    }

    animate(animation);

}


function BinarySearch(){
    let i = 0 , j = sizeOfArray - 1;
    let animation = [];
    elementFound = false;

    while(i <= j){
        let mid = Math.floor((i+j)/2);
        animation.push([mid , currentColor]);

        if(array[mid] == valueToBeSearched){
            elementFound = true;
            animation.push([mid , foundColor]);
            break;
        }
        else{
            animation.push([mid , visitedColor]);
            if(array[mid] < valueToBeSearched)
                i = mid + 1;
            else
                j = mid - 1;
        }
        console.log(i+" "+j);
    }

    console.log(animation);
    animate(animation);
}
