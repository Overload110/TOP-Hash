class HashMap {
    constructor() {
        this.buckets = [];
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode += key.charCodeAt(i);
        }
        return hashCode % this.buckets.length;
    }

    set(key, value) {
        const index = this.hash(key);
        
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (const item of this.buckets[index]) {
            if (item[0] === key) {
                item[1] = value;
                return;
            }
        }

        this.buckets[index].push([key, value]);
        this.size++;

        if (this.size / this.buckets.length > 0.75) {
            this.grow();
        }
    }

    get(key) {
        const targetBucket = this.buckets[this.hash(key)];
        
        if (!targetBucket) {
            return null;
        }
        
        for (const [k, v] of targetBucket) {
            if (k === key) {
                return v;
            }
        }

        return null;
    }
}