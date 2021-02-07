export default class Likes {
    constructor() {
        this.likes = []
    }

    addLike(id, img, title, author ) {
        const newLike = {id, img, title, author}
        this.likes.push(newLike)
        return newLike  
    }

    deleteLike (id) {
        const index = this.likes.findIndex( like => like.id === id );
        if (index !== -1) {
            this.likes.splice(index,1);
        } else {
            alert('No item to be removed from Likes')
        }
    }
    
    isLiked(id) {
        return this.likes.findIndex( like => like.id === id ) !== -1
    }

    getNumLikes() {
        return this.likes.length;
    }
}