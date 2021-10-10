
class Facet {
    facet;
    expression;
    id;
    values;
    expressionLength;
    length;


    constructor(facet){
        this.facet = facet;
        this.expression = [];
        this.id = new Map();
        this.values = [];
        this.expressionLength = [];
        this.length = 0;
    }

    addNewExpression(facet, expression, value, id){
        // console.log(id);
        this.facet = facet;
        this.expression.push(expression);
        this.values.push(value);
        // newLength = this.id.push(new Array());
        // this.id[newLength - 1] = id;
        let newId = new Array();
        newId.push(id);
        this.id.set(this.length, newId);
        // console.log("================", this.id, this.id.get(this.length));
        // this.id.set(this.length, this.id.get(this.length).push(id));
        // console.log(this.id.get(this.length)[this.id.get(this.length).length-1]);
        this.expressionLength.push(1);
        this.length++;

    }

    indexOfExpression(expression){
        // console.log(this.expression.indexOf(expression));
        return this.expression.indexOf(expression);
    }

    addToValue(indexOfExpression, value){
        // console.log(this.values[indexOfExpression], indexOfExpression);
        this.values[indexOfExpression] += value;
    }

    addId(indexOfExpression, id){
        this.id.get(indexOfExpression).push(id);
        this.id.set(indexOfExpression, this.id.get(indexOfExpression));
        this.expressionLength[indexOfExpression]++;
    }

    // get facet(){
    //     return this.facet;
    // }
}