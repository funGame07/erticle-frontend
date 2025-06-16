function imgURLParser(imgURL) {
    if(!imgURL) return null

  try{
    new URL(imgURL);
    return imgURL
  }catch(err){
    return import.meta.env.VITE_API_URL + '/' + imgURL
  }
}

export default imgURLParser