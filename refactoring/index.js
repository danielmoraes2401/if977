const { release } = require("os");
const { Children } = require("react");

class Price{
    constructor(){
        if (this.constructor === Price){
            throw new TypeError("Abstract class `Price` can not be instantiated");
        }
    }

    getPriceCode(){
        throw new TypeError("Method `getPriceCode` should be implemented")
    }

    getCharge(){
        throw new TypeError("Method `getCharge` should be implemented")
    }
}

class ChildrenPrice extends Price {
    constructor(){super();}

    getPriceCode(){
        return Movie.CHILDREN;
    }

    getCharge(daysRented){
        let result = 1.5;
        if(daysRented > 3){
            result += (daysRented - 3)*1.5;
        }
        return result;
    }

    getFrequentRenterPoints(daysRented){ return 1; }
}

class NewReleasePrice extends Price {
    constructor(){super();}

    getPriceCode(){
        return Movie.NEW_RELEASE;
    }

    getCharge(daysRented){ return daysRented*3; }

    getFrequentRenterPoints(daysRented){
        return (daysRented > 1) ?  2 : 1;
    }
}

class RegularPrice extends Price {
    constructor(){super();}

    getPriceCode(){
        return Movie.REGULAR;
    }

    getCharge(daysRented){
        let result = 2;
        if(daysRented > 2){
            result += (daysRented-2)*1.5;
        }
        return result;
    }

    getFrequentRenterPoints(daysRented){ return 1; }
}


class Movie {
    
    static get CHILDREN() {return 2;}

    static get REGULAR() {return 0;}

    static get NEW_RELEASE() {return 1;}

    constructor (title, price) {
        this._title = title;
        this._price = price;
    }

    get title() {return this._title;}

    get price() {return this._price;}

    set price(price) {
        this._price = price
    }

    getCharge(daysRented) {
        return this.price.getCharge(daysRented);
    }

    getFrequentRenterPoints(daysRented){
        
		
        return this.price.getFrequentRenterPoints(daysRented);
    }
}

class Rental {
    

    constructor(movie, daysRented) {
        this._movie = movie;
        this._daysRented = daysRented;
    }

    get movie() {return this._movie;}

    get daysRented() {return this._daysRented;}

    getCharge(){
        return this.movie.getCharge(this.daysRented)
    }

    getFrequentRenterPoints(){
       
	   
        return this.movie.getFrequentRenterPoints(this.daysRented);
    }
}

class Customer{
    
	
    constructor(name) {
        this._name = name;
        this._rentals = [];
    }

    get name() {return this._name;}

    get rentals() {return this._rentals;}

    addRental(rental) {
        this._rentals.push(rental);
    }

    htmlStatement(){
        let htmlResult = `<h1>Aluguel registrado por <strong>${this.name}</strong></h1>\n\n<ul>\n`
        for (let rental of this.rentals){
            htmlResult += `\t<li>${rental.movie.title}: ${rental.getCharge()}</li>\n`
        }
        htmlResult += `</ul>\n\n<p>\nMontante devido e <strong>${this.getTotalCharge()}</strong>.<br/>\nVoce ganhou ${this.getTotalFrequentRenterPoints()} pontos de locatorios frequentes\n</p>`
        return htmlResult
    }
    
    statement(){
        let result = `Aluguel registrado por ${this.name}\n`;
        for (let rental of this.rentals){
            
			
            result += `${rental.movie.title}\t${rental.getCharge()}\n`;
        }
        result += `Montante devido e ${this.getTotalCharge()}\nVoce ganhou ${this.getTotalFrequentRenterPoints()} pontos de locatorios frequentes`;
        return result
    }

    getTotalCharge(){
        let result = 0;
        for (let rental of this.rentals){
            result += rental.getCharge()
        }
        return result;
    }

    getTotalFrequentRenterPoints(){
        let result = 0;
        for (let rental of this.rentals){
            result += rental.getFrequentRenterPoints();
        }
        return result
    }

}


function test() {
    const c = new Customer('Daniel');

    const m1 = new Movie('Interstellar', new ChildrenPrice);
    const m2 = new Movie('2001', new RegularPrice);
    const m3 = new Movie('Ad Astra', new NewReleasePrice);

    const r1 = new Rental(m1, 3);
    const r2 = new Rental(m2, 1);
    const r3 = new Rental(m3, 10);

    c.addRental(r1);
    c.addRental(r2);
    c.addRental(r3);

    const actualOutput = c.statement();

    const expectedOutput = 
    `Aluguel registrado por Vinicius\n` +
    `Ratatouille\t1.5\n` +
    `Harry Potter e as Reliquias da Morte Parte 1\t2\n` +
    `Duna\t30\n` +
`Montante devido e 33.5\nVoce ganhou 4 pontos de locatorios frequentes`;

    const testPassed = expectedOutput === actualOutput;
	
    console.log(testPassed ? "Ok :)" : "Failed :(");

    if (!testPassed){
        console.log(`Output esperado\n${expectedOutput}\n\n`)
        console.log(`Output retornado\n${actualOutput}\n`)
    }
}

test()
