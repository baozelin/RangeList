
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range
//includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,201)
/** *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

class RangeList {
    /**
     *  
     *  constructor: initiate an arrary
     */
    constructor() {
        this.rlist= []
    }

    /**
     * Adds a range to the list, throws two exception
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {        
        //check input is not a range
        if(range.length < 2) {
            console.log("Input is not a range");
            return;
        }

        //case2: check left side must less than right side
        let [start, end] = range;
        if (start >= end ) {
            console.log("Input is not correct");
            return;
        }

        //add range
        this.addToRange(range);      
    }
    
    /**
     *  input range [left, right], based on left insert to this rangelist, and keep it sorted. Then call merge to rearrange range
     * @param {Array<number>} range -Array of two integers that specify beginning and end of range.
     */
    addToRange(range){

        let [start, end] = range;  
        //if rangelist is empty, just add
        let index = 0;
        if(this.rlist.length == 0){
            this.rlist.push([start, end]);
            return;
        }

        // according to left value, insert to rangelist
        while(index < this.rlist.length){
            let[left, right] = this.rlist[index];
            if(start <= left){
                this.rlist.splice(index, 0,[start, end]);
                this.merge();
                return;
            }
            index += 1;
        }

        //after find position, insert it and call merge function
        this.rlist.push([start, end]);
        this.merge();
    }


    /**
     *  no input, merge each range in the rangelist
     */
    merge(){
        //create temporary array
        let tmplist = [];
        //travel rangelist and merge range, add new range to tmp list
        for(let index = 0; index < this.rlist.length; index++){         
            let left = this.rlist[index][0];
            let right = this.rlist[index][1];
            while(index +1 < this.rlist.length && right >= this.rlist[index+1][0]){
                right = Math.max(this.rlist[index+1][1], right);
                index++;
            }
             tmplist.push([left, right]);
             left = this.rlist[index][0];
       
        }

        //copy tmp list to rangelist
        this.rlist = tmplist;
            
    }


    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        let[left,right] = range;

        //if left and right of range is equal, return
        if(left == right) return;

        let tmplist = [];
        let index = 0;
    
        //find the position of range
        while(index < this.rlist.length && left > this.rlist[index][1]){
            tmplist.push(this.rlist[index]);
            index++;
        }

        // if range left is equal with current left side
        if(left == this.rlist[index][0]){
            if(right < this.rlist[index][1]){
                tmplist.push([right, this.rlist[index][1]]);
            }             
        }

        //range left is less than current left side
        else if(left < this.rlist[index][0]){
            console.log(`error`);
            return;
        }

        //range left is great than current left side
        else{
            let curLeft = this.rlist[index][0];
            tmplist.push([curLeft,left]);
            

            if(left < this.rlist[index][1] && right < this.rlist[index][1]){
                tmplist.push([right, this.rlist[index][1]]);
            }
            else{
                while(index < this.rlist.length && right > this.rlist[index][1]){
                    index += 1;
                }
                if(index >= this.rlist.length){
                    tmplist.push([curLeft, left]);
                }else{
                    tmplist.push([right,this.rlist[index][1]]);
                }
            }          
        }
        index += 1;
        while(index < this.rlist.length){
            tmplist.push(this.rlist[index]);
            index +=1
        }
        this.rlist = tmplist;
    }

    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        let output = "";
        for(let interval in this.rlist){
            output += "[" + this.rlist[interval] +")"+ " ";
        }
        console.log(output);
    } }


    

    /**
     *  provided test case
     */
     // Example run
    
     const rl = new RangeList();
     rl.add([1, 5]);
     rl.print();
     // Should display: [1, 5) 
     //rl.add([0, 4]);
     // Should display: [1, 5)
     rl.add([10, 20]);
     rl.print();
     // Should display: [1, 5) [10, 20)
     rl.add([20, 20]);
     rl.print();
     // Should display: [1, 5) [10, 20)
     rl.add([20, 21]);
     rl.print();
     // Should display: [1, 5) [10, 21)
     rl.add([2, 4]);
     rl.print();
     // Should display: [1, 5) [10, 21)
     rl.add([3, 8]);
     rl.print();
     // Should display: [1, 8) [10, 21)
     rl.remove([10, 10]);
     rl.print();
     // Should display: [1, 8) [10, 21)
     rl.remove([10, 11]);
     rl.print();
     // Should display: [1, 8) [11, 21)
     rl.remove([15, 17]);
     rl.print();
     // Should display: [1, 8) [11, 15) [17, 21)   
     rl.remove([3, 19]);
     rl.print();
     // Should display: [1, 3) [19, 21)

    
    /**
     *  I create some test cases
     *  unit test
     */



    /**
     *  test1 : add [1,8], [10,21], [44,55], [66, 77]
     *  expected display [1,8], [10,21], [44,55], [66, 77]
     */
    console.log("test case 1: ");
    const rl4 = new RangeList();
    rl4.add([1, 8]);
    rl4.add([10, 21]);
    rl4.add([44, 55]);
    rl4.add([66, 77]);
    rl4.print();


     

    
    /**
     *  test3 : add [1,2], [2,5], [6,10], remove [2,5]
     *  expected display [1,2) [5,10) 
     */
    console.log("test case 3: ");
    const rl2 = new RangeList();
    rl2.add([1, 2]);
    rl2.add([2, 5]);
    rl2.add([5, 10]);
    rl2.remove([2,5]);
    rl2.print();


     /**
     *  test4 : add [1,2], [3,5], [6,10], remove [3,5]
     *  expected display [1,2) [6,10)
     */
    console.log("test case 3: ");
    const rl5 = new RangeList();
    rl5.add([1, 2]);
    rl5.add([3, 5]);
    rl5.add([6, 10]);
    rl5.remove([3,5]);
    rl5.print();
