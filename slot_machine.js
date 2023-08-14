const prompt=require("prompt-sync")();

 const ROWS=3;
 const COLS=3;

 const SYMBOLS_COUNT=
 {
    A:2,
    B:4,
    C:6,
    D:8
 }

 const SYMBOL_VALUES=
 {
    A:5,
    B:4,
    C:3,
    D:2
 }



function deposit1()
{
    while(true)
    {

    
        const DepAmt1=prompt("Enter Desired Deposit Amount: ");
        const DepAmt=parseFloat (DepAmt1);

        if(isNaN(DepAmt)||DepAmt<=0)
        {
            console.log("Invalid Input, try again.");
        }
        else
        {
            return DepAmt;
        }
    }
}

function getNoLines()
{
    while(true)
    {

    
        const NoLines1=prompt("Enter Number of Lines(1-3): ");
        const NoLines=parseFloat (NoLines1);

        if(isNaN(NoLines)||NoLines<=0||NoLines>3)
        {
            console.log("Invalid Input, Try Again.");
        }
        else
        {
            return NoLines;
        }
    }
}

function getBet(balance,lines1)
{
    while(true)
    {

    
        const Bet1=prompt("Enter Desired Bet Amount per Line: ");
        const Bet=parseFloat (Bet1);

        if(isNaN(Bet)||Bet<=0||Bet>(balance/lines1))
        {
            console.log("Invalid Input, try again.");
        }
        else
        {
            return Bet;
        }
    }
}

function Spin()
{
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT))
    {
        for(let i=0;i<count;i++)
        {
            symbols.push(symbol);
        }
    }

    const reels=[];
    for(let i=0;i<COLS;i++)
    {
        reels.push([]);
        const reelSymbols=[...symbols];
        for(let j=0;j<ROWS;j++)
        {
            const index=Math.floor(Math.random()*reelSymbols.length); 
            const selectedSymbol=reelSymbols[index];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(index,1);
        }
    }

    return reels;
}

function transpose(reels)
{
    const rows=[];
    for(let i=0;i<ROWS;i++)
    {
        rows.push([]);
        for(let j=0;j<COLS;j++)
        {
            rows[i].push(reels[j][i])
        }
    } 

    return rows;
}

function printRows(rows)
{
    for(const row of rows)
    {
        let rowString="";
        for(const[i,symbol] of row.entries())
        {
            rowString+=symbol;
            if(i!=row.length-1)
            {
                rowString+=" | "
            }
        }
        console.log(rowString);
    }
}

function getWinnings(rows,bet,lines)
{
    let winnings=0;
    for(let row=0;row<lines;row++)
    {
        const symbols=rows[row];
        let allSame=true; 

        for(const symbol of symbols)
        {
            if(symbol!=symbols[0])
            {
                allSame=false;
                break;
            }
        }
        if(allSame)
        {
            winnings+=bet*SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}

function game()
{
    let deposit=deposit1();

    while(true)
    {
        console.log("Your Balance: "+ deposit);
        const lines=getNoLines();
        const bet=getBet(deposit,lines);
        deposit-=bet*lines;
        const reels=Spin();
        const rows=transpose(reels);
        printRows(rows);
        const winnings=getWinnings(rows,bet,lines);
        deposit+=winnings;
        console.log("You Won "+ winnings.toString());

        if(deposit<=0)
        {
            console.log("Balance Depleted!");
            break;
        }
        const playAgain=prompt("Play Again? (y/n)")

        if(playAgain!="y")
        break;
    }
    
}

game();
