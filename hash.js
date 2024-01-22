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

    grow() {
        const oldBuckets = this.buckets;
        this.buckets = [];
        this.size = 0;

        oldBuckets.forEach((bucket) => {
            if (bucket) {
                bucket.forEach(([k, v]) => this.set(k, v));
            }
        });
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

    remove(key) {
        const targetIndex = this.hash(key);

        if (!this.buckets[targetIndex]) {
            return false;
        }

        for (let i = 0; i < this.buckets[targetIndex].length; i++) {
            if (this.buckets[targetIndex][i][0] === key) {
                this.buckets[targetIndex].splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    has(key) {
        const targetBucket = this.buckets[this.hash(key)];
        return !!targetBucket && targetBucket.some(([k,]) => k === key);
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = [];
        this.size = 0;
    }

    keys() {
        return this.buckets.reduce((keys, bucket) => {
            return bucket ? keys.concat(bucket.map(([k,]) => k)) : keys;
        }, []);
    }
}