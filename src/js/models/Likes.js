export default class Likes {
    constructor() {
        this.likes = []
    }

    addLike(id, img, title, author ) {
        const newLike = {id, img, title, author}
        this.likes.push(newLike)

        this.persistData(); // Persist data in local storage
        return newLike  
    }

    deleteLike (id) {
        const index = this.likes.findIndex( like => like.id === id );
        if (index !== -1) {
            this.likes.splice(index,1);
            this.persistData(); // Persist data in local storage

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

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    readStorage() {
        const storage = JSON.parse( localStorage.getItem('likes') )
        if (storage) this.likes = storage;
    }
    
}