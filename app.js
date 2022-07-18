const imgNext= document.querySelector(".image-next")
const imgCurrent = document.querySelector(".image-current")
const imgPrev = document.querySelector(".image-prev")
const btnLike = document.querySelector(".like")
const btnDeslike = document.querySelector(".deslike")
const btnPrev = document.querySelector(".prev")
const btnSuperLike= document.querySelector(".star")
const imgStar = document.querySelector(".anima-super-like")
const imgHeart = document.querySelector(".anima-like")


const api = "https://dog.ceo/api/breeds/image/random"


let urlNextImage, urlCurrentImage, urlPrevImage


const searchImage = async () =>{
    let resp = await fetch(api)
    let data = await resp.json()
    return data.message

}

let actions = [btnDeslike, btnLike, btnPrev, btnSuperLike]

const disableButtons = (action) => {
    actions.forEach(btn => btn.style.pointerEvents = action)
}


const next =  async () =>{

    imgCurrent.classList.add("translate")

    setTimeout(async ()=>{

        urlPrevImage = urlCurrentImage
        urlCurrentImage = urlNextImage

        imgCurrent.style.display = "none"
        imgCurrent.style.backgroundImage = `url(${urlCurrentImage})`
        imgCurrent.classList.remove("translate")

        urlNextImage = await searchImage()

        disableButtons("auto")

        setTimeout(()=>{
           
            imgCurrent.style.display = "block"
            imgPrev.style.display = "block"
            imgNext.style.backgroundImage = `url(${urlNextImage})`


        },200)

        imgCurrent.style.display = "block"
        imgPrev.style.display = "block"
        imgNext.style.backgroundImage = `url(${urlNextImage})`

    },252)
    
}


const prev = async () =>{

    imgPrev.style.backgroundImage = `url(${urlPrevImage})`
    imgPrev.classList.add("translate")
    
    setTimeout(()=>{

        imgPrev.style.display = "none"

        urlNextImage = urlCurrentImage
        urlCurrentImage = urlPrevImage

        imgCurrent.style.backgroundImage = `url(${urlCurrentImage})`
        imgNext.style.backgroundImage = `url(${urlNextImage})`
        
        imgPrev.classList.remove("translate")

    },202)

    
}

const animation = (element)=>{

    element.classList.add("animation")
    disableButtons("none")

    setTimeout(()=>{
        element.classList.remove("animation")
        next()
    },3003)

}

const init = async () =>{

    urlCurrentImage = await searchImage()
    urlNextImage = await searchImage()

    imgCurrent.style.backgroundImage = `url(${urlCurrentImage})`
    imgNext.style.backgroundImage = `url(${urlNextImage})`


}

init()

btnLike.addEventListener("click",()=>{
    animation(imgHeart)
})

btnSuperLike.addEventListener("click", ()=>{
    animation(imgStar)
})

btnPrev.addEventListener("click", prev)
btnDeslike.addEventListener("click", next)
