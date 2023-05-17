const fileInput =document.querySelector(".file_input"),
filterOptions =document.querySelectorAll(".filter button"),
rotateOptions =document.querySelectorAll(".rotate button"),
filterName =document.querySelector(".filter_info .name"),
filterValue =document.querySelector(".filter_info .value"),
filterSlider =document.querySelector(".slider input"),
previewImg =document.querySelector(".preview_img img"),
chooseImgBtn =document.querySelector(".choose_img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVartical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg)scale(${flipHorizontal},${flipVartical})`;
    previewImg.style.filter = `brightness(${brightness}%)saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]; // getting user selected file
    if(!file) return; // return if user hasn't  selected file
    previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
    previewImg.addEventListener("load", () =>{
        document.querySelector(".container").classList.remove("disable");
    });
}
filterOptions.forEach(option => {
    option.addEventListener("click", () => { // adding click event listener to all filter buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else  if(option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else  if(option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else{
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updatefilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }
    applyFilters();
}
rotateOptions.forEach(option =>{
    option.addEventListener("click", () => { // adding click event listener to all rotate/filp buttons
        if(option.id === "left"){
            rotate -= 90; // if clicked btn left rotate, decrement rotate value by -90
            
        }else if(option.id === "right"){
            rotate += 90; // if clicked btn left rotate, increment rotate value by +90
        }else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1; // if horizontal value is 1, set this value to  -1 else set 1
        }else{ // if flipVertical value is 1, set this value to  -1 else set 1
            flipVartical = flipVartical === 1 ? -1 : 1;
        }
        applyFilters();
    });
})

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input",updatefilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());