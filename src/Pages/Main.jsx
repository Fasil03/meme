import React from "react";


function Main(){

   const [memes, setMemes] = React.useState({
    topText: "When you realize...",
    bottomText: "It all makes sense now",
    imageURL: "./Images/fasilo.jpg"
});

    const [allMemes, setAllMemes]= React.useState([]);

    React.useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes')
             .then(res=>res.json())
             .then(data=>setAllMemes(data.data.memes))
    }, [])

   function getMemeImage() {
    if (allMemes.length === 0) return;   // prevent crash
    
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url;
    
    setMemes(prev => ({
        ...prev,
        imageURL: newMemeUrl       
    }));
}


    function handleChange(event){
        const {value ,name}=event.currentTarget;
        setMemes(pervMeme=>({
            ...pervMeme, [name]: value
        }))
    }

    return(
        <main>
            <div className="form">
                <div className="input-row">
                <label className="topText">Top Text
                    <input type="text"
                     placeholder=" One does not simply"
                     name="topText" 
                     onChange={handleChange}
                     value={memes.topText}
                     />
                    
                </label>
                <label className="bottomText">Bottom Text
                    <input type="text"
                     placeholder="Walk into Fasilo"
                     name="bottomText" 
                     onChange={handleChange}
                     value={memes.bottomText}
                     />
                    
                </label>
                </div>
                <button onClick={getMemeImage}>Get a new meme image $</button>
            </div>
            <div className="meme">
                <img src={memes.imageURL} alt="meme-image" width="1000px"/>
                <span className="top">{memes.topText}</span>
                <span className="bottom">{memes.bottomText}</span>
            </div>
        </main>

    );

}
export default Main;