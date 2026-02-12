/*
  ITW(LTI)
  2022/2023
  Grupo nº36
  PL24
  Pedro Rosa nº60294
  Tomás Nogueira nº60285
  Tiago Raposo nº60293

*/


// Variaveis Globais
const SIGNUP_FORMULARIO = "spform";
const LOGIN_FORMULARIO = "loginform";
const BTN_SIGNUP = "btn_signup";
const BTN_LOGIN = "btn_login";
const ITEM_UTILIZADOR = "utilizador";
const ITEM_EMAIL = "email";
const ITEM_PSW = "psw";
const ITEM_RPSW = "psw-repeat";
const CELL = "cell";

let formulario_login= null;
let formulario_signup=null;
let utilizadores=[];
let tabuleiro=[];





// Ao dar load da página chama a função principal

window.addEventListener("load",principal);



function principal(){
    

    
    formulario_signup = document.forms[SIGNUP_FORMULARIO];
    formulario_login = document.forms[LOGIN_FORMULARIO];
    

    //Carrega os conteúdos em localStorage
    carregaUtilizadores();
    carregaResultados();


    // Cria a array com os vários tipos de joias diferentes
    joias=CriarJoias();
    


    defineEventHandlersParaElementosHTML();
}
    

    
function defineEventHandlersParaElementosHTML() {
    const el = document.getElementById(BTN_SIGNUP);
    const il = document.getElementById(BTN_LOGIN);
    
    if (el){
        el.addEventListener("click", trataFazerUtilizador);
    }
    if(il){
        il.addEventListener("click",trataFazerLogin);
    }
}


let primeiraJoia=null;

function trataTrocarJoias(joia){
    
    if (primeiraJoia===null){
        primeiraJoia=joia;
    }
    else{
        const segundaJoia= joia;
        var index1=(parseInt((primeiraJoia.id).substr(4)-1));
        var index2=(parseInt((segundaJoia.id).substr(4)-1));
        var diferençaindíces=index2-index1;
        
        

        if(diferençaindíces===1||diferençaindíces===-1||diferençaindíces===8||diferençaindíces===-8){
            
        
            var index1=(parseInt((primeiraJoia.id).substr(4)-1));
            var index2=(parseInt((segundaJoia.id).substr(4)-1));
            var tabuleiro_novo = tabuleiro.slice();
            const temp2 = tabuleiro_novo[index1];
            tabuleiro_novo[index1]=tabuleiro_novo[index2];
            tabuleiro_novo[index2]=temp2;

            const temp= primeiraJoia.style.backgroundImage;
            primeiraJoia.style.backgroundImage = segundaJoia.style.backgroundImage;
            segundaJoia.style.backgroundImage = temp;

            var valor=VerificaJoiasHorizontalJogada(joias,tabuleiro_novo);
            if(valor){
                primeiraJoia=null;
                tabuleiro=tabuleiro_novo;
                
                
            }
            else{
                const temp1= segundaJoia.style.backgroundImage;
                segundaJoia.style.backgroundImage = primeiraJoia.style.backgroundImage;
                primeiraJoia.style.backgroundImage = temp1;
                primeiraJoia=null;
                tabuleiro_novo=tabuleiro;
                alert("Não conseguiste alinhar pelo menos 3 joias consecutivas! Tenta outra vez!");
            }
              
        }
        else{
            alert("Não podes trocar essas joias! Só podes trocar joias adjacentes!");
            primeiraJoia=null;
            tabuleiro_novo=tabuleiro;
        
        }
        
          
        
    }
    
}

function DarSignOut(){
    window.location.reload();
}


// Mais variaveis Globais

const ITEM_NOME="uname";
const ITEM_PASSWORD="psw1";




function trataFazerLogin(){
    

    var check=1;
    var check1=1;

    for (let i in utilizadores){
        

        if(formulario_login.elements[ITEM_NOME].value === utilizadores[parseInt(i)][0] && formulario_login.elements[ITEM_PASSWORD].value === utilizadores[parseInt(i)][1]){  
            
            check=0;
            
            // Remove o botão de login e signup do header
            removeBotãoHeader();  

            
            
            // adiciona ao header o nome do utilizador e um botao de sign out
            let NovaLinhaHeader= document.createElement("li");
            
            
            NovaLinhaHeader.innerHTML= '<li id="li3" >' +'<button onclick="MostraEstatisticaJogador()">'+ formulario_login.elements[ITEM_NOME].value+"</button>" + "</li>";
            document.querySelector("ul#navegador-header li").parentNode.appendChild(NovaLinhaHeader);
            
            
            let NovaLinha_Header1= document.createElement("li");
            NovaLinha_Header1.innerHTML='<li id="li4" ">'+'<button onclick="DarSignOut()">' +"SIGN OUT"+"</button>" + "</li>";
            document.querySelector("ul#navegador-header li").parentNode.appendChild(NovaLinha_Header1);
            

            break;
        }
        else if (formulario_login.elements[ITEM_NOME].value === utilizadores[parseInt(i)][0]){
            check1 = 0;

        }
        



    }

    if (check===1 && check1===1){
        
        alert("Este utilizador não existe!");
        formulario_login.reset();

    }
    if(check1===0 && check===1){

        alert("Palavra passe errada!");
        
        formulario_login.reset();


    }
    


    
    
}




function removeBotãoHeader(){

    

    let Header = document.querySelectorAll("ul#navegador-header li + li + li");


    for(let header_par of Header){
        header_par.parentNode.removeChild(header_par);
    }
    
    
    document.getElementById('id01').style.display='none';

}



function trataFazerUtilizador() {

        // Verifica se os valores nos campos do formulário satisfazem as restrições
        // especificadas em HTML, como o campo ter de estar preenchido (required),
        
        
        
        let utilizadorValido = null;
        if (formulario_signup.elements[ITEM_PSW].value === formulario_signup.elements[ITEM_RPSW].value){
            utilizadorValido = true;
            
            
        }
        else{
            utilizadorValido = false;
            alert("As passwords não são iguais!");
        }
        
        
        let utilizador   = null;
      
        if (utilizadorValido) {
          
          
            utilizador = [formulario_signup.elements[ITEM_EMAIL].value, formulario_signup.elements[ITEM_PSW].value];  
            
            

            let check = false;
            for(let x of utilizadores ){
                
                if(x[0] === utilizador[0] ){
                    check=true;
                    
                }
            
            }

            if(check){
                
                alert("Nome de utilizador já existe! ");   
                formulario_signup.reset();
                
                    
            }
            else{
                gravautilizadorNoHistorico(utilizador);
                formulario_signup.reset();
                alert("O seu utilizador foi criado com sucesso!");

                
            
            }

             
      
          
            
            
        
      
            

        }
        
}


function gravautilizadorNoHistorico(utilizador) {
    
    // Coloca o utilizador no histórico e guarda-o no local storage do browser.
    utilizadores.push(utilizador);
    gravaHistoricoutilizadores();
}





function gravaHistoricoutilizadores (){
    localStorage.setItem(ITEM_UTILIZADOR, JSON.stringify(utilizadores));

}




function carregaUtilizadores(){

    utilizadores = JSON.parse(localStorage.getItem(ITEM_UTILIZADOR)) || [];
}

class Joia{
    constructor(cor,source){
        this.cor=cor
        this.source=source
    }
    GetCor(){
        return this.cor
    }
    GetSource(){
        return this.source
    }
    

}

// Diferentes tipos de Joias 

const JoiaVermelha=new Joia("vermelha","../ITW-G36-E2/Imagens/pngtree-dazzling-red-gems-illustration-image_1425563-removebg-preview.png")
const JoiaVerde=new Joia("verde","../ITW-G36-E2/Imagens/png-transparent-green-emerald-emerald-emerald-green-jewelry-removebg-preview.png")
const JoiaPrateada=new Joia("prateada","../ITW-G36-E2/Imagens/png-transparent-silver-jewelry-design-jewellery-silver-gemstone-glass-sphere-removebg-preview.png")
const JoiaRoxa=new Joia("roxa","../ITW-G36-E2/Imagens/png-transparent-crystal-others-miscellaneous-purple-gemstone-removebg-preview.png")
const JoiaAmarela=new Joia("amarela","../ITW-G36-E2/Imagens/png-transparent-crystal-diamond-star-golden-gemstone-diamond-gold-removebg-preview.png")
const JoiaLaranja=new Joia("laranja","../ITW-G36-E2/Imagens/png-transparent-birthstone-topaz-gemstone-jewellery-sapphire-gemstone-ring-orange-diamond.png")
const JoiaAzul=new Joia ("azul","../ITW-G36-E2/Imagens/png-transparent-gemstone-bejeweled-diamond-computer-icons-blue-gem-gemstone-blue-angle-removebg-preview.png")


function CriarJoias(){

    
    
    let joias=[]
    

    joias.push(JoiaVermelha)
    joias.push(JoiaVerde)
    joias.push(JoiaPrateada)
    joias.push(JoiaRoxa)
    joias.push(JoiaAmarela)
    joias.push(JoiaLaranja)
    joias.push(JoiaAzul)
    
    

    return joias;
}



// Faz a disposição aleatoria das joias no tabuleiro
function JoiasRandom(Joias,tabuleiro){
    
    for (let step=0; step<64;step++){
        let numerorandom=Math.floor((Math.random() * 7));
        
        tabuleiro[step]=(Joias[numerorandom]);
        
        var source = tabuleiro[step].GetSource()
        
        document.getElementById("cell"+((step+1).toString())).style.backgroundImage="url("+source+")";
        
              
            
    }

    
    //verifica se ao dispor aleatoriamente ficaram 3 joias horizontais seguidas.
    VerificaJoiasHorizontal(Joias,tabuleiro);

    
}


function VerificaJoiasHorizontal(Joias,tabuleiro){
    
    for (let x in tabuleiro){
        
        if (parseInt(x)<=61&&parseInt(x)!==6&&parseInt(x)!==7&&parseInt(x)!==14&&parseInt(x)!==15&&parseInt(x)!==22&&parseInt(x)!==23&&parseInt(x)!==30&&parseInt(x)!==31&&parseInt(x)!==38&&parseInt(x)!==39&&parseInt(x)!==46&&parseInt(x)!==47&&parseInt(x)!==54&&parseInt(x)!==55){

            if (tabuleiro[parseInt(x)].GetCor()===tabuleiro[parseInt(x)+1].GetCor() && tabuleiro[parseInt(x)].GetCor()===tabuleiro[parseInt(x)+2].GetCor()){
                
                
                let numerorandom=Math.floor((Math.random() * 7));
                
                tabuleiro[x]=Joias[numerorandom];
           
                var source = tabuleiro[x].GetSource();
                
                document.getElementById("cell"+((parseInt(x)+1).toString())).style.backgroundImage="url("+source+")";
                
                VerificaJoiasHorizontal(Joias,tabuleiro);
            }
            



        }
        
    }
}


// verifica o tabuleiro após uma jogada
function VerificaJoiasHorizontalJogada(Joias,tabuleiro){
    
    var valor=false;
   
        for(let x in tabuleiro){
            
            

        
            if (parseInt(x)<=55&&parseInt(x)!==6&&parseInt(x)!==7&&parseInt(x)!==14&&parseInt(x)!==15&&parseInt(x)!==22&&parseInt(x)!==23&&parseInt(x)!==30&&parseInt(x)!==31&&parseInt(x)!==38&&parseInt(x)!==39&&parseInt(x)!==46&&parseInt(x)!==47&&parseInt(x)!==54&&parseInt(x)!==55){
                
                
                let passo=1;
                let contador=1;
    
               
                while (passo<=7) {
                    if (tabuleiro[parseInt(x)].GetSource()===tabuleiro[parseInt(x)+contador].GetSource()){
                        contador=contador+1;
                        passo=passo+1;
                    }
                    else{
                        
                        passo=9;
    
                    }
                }
                

                if (contador>=3){
                    valor=true;
                    teste=true;
    
                    alert("Conseguiste alinhar joias seguidas horizontalmente");
                    if (parseInt(x)<8){
                        for(var line=0;line<contador;line++){
                            let numerorandom=Math.floor((Math.random()*7));
                            tabuleiro[parseInt(x)+line]=Joias[numerorandom];
                            var source=tabuleiro[parseInt(x)+line].GetSource();
                            document.getElementById("cell"+(parseInt(x)+line+1).toString()).style.backgroundImage="url("+source+")";
    
                        }
                        
    
                    }
                    else if(parseInt(x)>=8 && parseInt(x)<16){
                        
                        for(var line=0;line<contador;line++){
                            tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                            let numerorandom=Math.floor((Math.random()*7));
                            tabuleiro[parseInt(x)-8+line]=Joias[numerorandom];
                            var source=tabuleiro[parseInt(x)+line].GetSource();
                            var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                            document.getElementById("cell"+(parseInt(x)+line+1).toString()).style.backgroundImage="url("+source+")";
                            document.getElementById("cell"+(parseInt(x)-8+line+1).toString()).style.backgroundImage="url("+source2+")";
    
    
                        }
                        
                         
    
                    }
                    else if(parseInt(x)>=16&&parseInt(x)<24){
                        for(var line=0;line<contador;line++){
                            tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                            let numerorandom=Math.floor((Math.random()*7));
                            tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                            tabuleiro[parseInt(x)-16+line]=Joias[numerorandom];
                            var source=tabuleiro[parseInt(x)+line].GetSource();
                            var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                            var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                            document.getElementById("cell"+(parseInt(x)+line+1).toString()).style.backgroundImage="url("+source+")";
                            document.getElementById("cell"+(parseInt(x)-8+line+1).toString()).style.backgroundImage="url("+source2+")";
                            document.getElementById("cell"+(parseInt(x)-16+line+1).toString()).style.backgroundImage="url("+source3+")";
    
    
                        }
    
                    }
                    else if(x>=24&&x<32){
                        for(var line=0;line<contador;line++){
                            tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                            let numerorandom=Math.floor((Math.random()*7));
                            tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                            tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                            tabuleiro[parseInt(x)-24+line]=Joias[numerorandom];
                            var source=tabuleiro[parseInt(x)+line].GetSource();
                            var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                            var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                            var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                        
                            document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                            document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                            document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                            document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
    
    
                        }

    
                    }
                    else if(x>=32&&x<40){
                        for(var line=0;line<contador;line++){
                            tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                            let numerorandom=Math.floor((Math.random()*7));
                            tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                            tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                            tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                            tabuleiro[parseInt(x)-32+line]=Joias[numerorandom];
                            var source=tabuleiro[parseInt(x)+line].GetSource();
                            var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                            var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                            var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                            var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                            document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                            document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                            document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                            document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                            document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
    
    
                        }
                        
    
                    }
                    else if(x>=40&&x<48){
                        for(var line=0;line<contador;line++){
                            tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                            let numerorandom=Math.floor((Math.random()*7));
                            tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                            tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                            tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                            tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                            tabuleiro[parseInt(x)-40+line]=Joias[numerorandom];
                            var source=tabuleiro[parseInt(x)+line].GetSource();
                            var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                            var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                            var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                            var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                            var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                            document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                            document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                            document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                            document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                            document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                            document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
    
    
                        }
                        
    
                    }
                    else if(x>=48&&x<56){
    
                        for(var line=0;line<contador;line++){
                            tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                            let numerorandom=Math.floor((Math.random()*7));
                            tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                            tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                            tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                            tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                            tabuleiro[parseInt(x)-40+line]=tabuleiro[parseInt(x)-48+line];
                            tabuleiro[parseInt(x)-48+line]=Joias[numerorandom];
                            var source=tabuleiro[parseInt(x)+line].GetSource();
                            var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                            var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                            var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                            var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                            var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                            var source7=tabuleiro[parseInt(x)-48+line].GetSource();
                            document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                            document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                            document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                            document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                            document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                            document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
                            document.getElementById("cell"+((parseInt(x)-48+line+1).toString())).style.backgroundImage="url("+source7+")";
    
    
                        }
                        
    
                    }
                    
                    pontuação=pontuação+((contador-3)+1);
                    JoiasEliminadas=JoiasEliminadas+contador;
                    JoiasRestantes=JoiasRestantes-contador;
                    if(JoiasEliminadas<=20){
                        VerificaJoiasHorizontalJogada(Joias,tabuleiro); 
                    }
                    
                    break;   
                }
               
    
            }
            
            else if (parseInt(x)===56){
                
                
                
                let passo =1;
                let contador=1;
                while(passo<=7){
                    if (tabuleiro[parseInt(x)].GetSource()===tabuleiro[parseInt(x)+passo].GetSource()){
                        contador=contador+1;
                        passo=passo+1;
                    }
                    else{
                        passo=9;
                    }
                }
                if(contador>=3){
                    valor=true;
                    alert("Alinhaste joias seguidas horizontalmente");
                    for(var line=0;line<contador;line++){
                        tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                        let numerorandom=Math.floor((Math.random()*7));
                        tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                        tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                        tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                        tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                        tabuleiro[parseInt(x)-40+line]=tabuleiro[parseInt(x)-48+line];
                        tabuleiro[parseInt(x)-48+line]=tabuleiro[parseInt(x)-56+line];
                        tabuleiro[parseInt(x)-56+line]=Joias[numerorandom];
                        var source=tabuleiro[parseInt(x)+line].GetSource();
                        var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                        var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                        var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                        var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                        var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                        var source7=tabuleiro[parseInt(x)-48+line].GetSource();
                        var source8=tabuleiro[parseInt(x)-56+line].GetSource();
                        document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                        document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                        document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                        document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                        document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                        document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
                        document.getElementById("cell"+((parseInt(x)-48+line+1).toString())).style.backgroundImage="url("+source7+")";
                        document.getElementById("cell"+((parseInt(x)-56+line+1).toString())).style.backgroundImage="url("+source8+")";

                    }
                    pontuação=pontuação+((contador-3)+1);
                    JoiasEliminadas=JoiasEliminadas+contador;
                    JoiasRestantes=JoiasRestantes-contador;
                    if(JoiasEliminadas<=20){
                        VerificaJoiasHorizontalJogada(Joias,tabuleiro); 
                    }
                    break;
                    
                }
            }

            else if(parseInt(x)===57){
                
                
                let passo =1;
                let contador=1;
                while(passo<=6){
                    if (tabuleiro[parseInt(x)].GetSource()===tabuleiro[parseInt(x)+contador].GetSource()){
                        contador=contador+1;
                        passo=passo+1;
                    }
                    else{
                        passo=9;
                    }
                }
                if(contador>=3){
                    valor=true;
                    alert("Alinhaste joias seguidas horizontalmente");
                    for(var line=0;line<contador;line++){
                        tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                        let numerorandom=Math.floor((Math.random()*7));
                        tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                        tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                        tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                        tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                        tabuleiro[parseInt(x)-40+line]=tabuleiro[parseInt(x)-48+line];
                        tabuleiro[parseInt(x)-48+line]=tabuleiro[parseInt(x)-56+line];
                        tabuleiro[parseInt(x)-56+line]=Joias[numerorandom];
                        var source=tabuleiro[parseInt(x)+line].GetSource();
                        var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                        var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                        var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                        var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                        var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                        var source7=tabuleiro[parseInt(x)-48+line].GetSource();
                        var source8=tabuleiro[parseInt(x)-56+line].GetSource();
                        document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                        document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                        document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                        document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                        document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                        document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
                        document.getElementById("cell"+((parseInt(x)-48+line+1).toString())).style.backgroundImage="url("+source7+")";
                        document.getElementById("cell"+((parseInt(x)-56+line+1).toString())).style.backgroundImage="url("+source8+")";

                    }
                    pontuação=pontuação+((contador-3)+1);
                    JoiasEliminadas=JoiasEliminadas+contador;
                    JoiasRestantes=JoiasRestantes-contador;
                    if(JoiasEliminadas<=20){
                        VerificaJoiasHorizontalJogada(Joias,tabuleiro); 
                    }
                    break;
                    
                }

            }
            else if(parseInt(x)===58){
                
                
                let passo =1;
                let contador=1;
                while(passo<=5){
                    if (tabuleiro[parseInt(x)].GetSource()===tabuleiro[parseInt(x)+contador].GetSource()){
                        contador=contador+1;
                        passo=passo+1;
                    }
                    else{
                        passo=9;
                    }
                }
                if(contador>=3){
                    valor=true;
                    alert("Alinhaste joias seguidas horizontalmente");
                    for(var line=0;line<contador;line++){
                        tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                        let numerorandom=Math.floor((Math.random()*7));
                        tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                        tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                        tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                        tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                        tabuleiro[parseInt(x)-40+line]=tabuleiro[parseInt(x)-48+line];
                        tabuleiro[parseInt(x)-48+line]=tabuleiro[parseInt(x)-56+line];
                        tabuleiro[parseInt(x)-56+line]=Joias[numerorandom];
                        var source=tabuleiro[parseInt(x)+line].GetSource();
                        var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                        var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                        var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                        var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                        var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                        var source7=tabuleiro[parseInt(x)-48+line].GetSource();
                        var source8=tabuleiro[parseInt(x)-56+line].GetSource();
                        document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                        document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                        document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                        document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                        document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                        document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
                        document.getElementById("cell"+((parseInt(x)-48+line+1).toString())).style.backgroundImage="url("+source7+")";
                        document.getElementById("cell"+((parseInt(x)-56+line+1).toString())).style.backgroundImage="url("+source8+")";

                    }
                    pontuação=pontuação+((contador-3)+1);
                    JoiasEliminadas=JoiasEliminadas+contador;
                    JoiasRestantes=JoiasRestantes-contador;
                    if(JoiasEliminadas<=20){
                        VerificaJoiasHorizontalJogada(Joias,tabuleiro); 
                    }
                    break;
                    
                }
            }
            else if(parseInt(x)===59){
                
                
                let passo =1;
                let contador=1;
                while(passo<=4){
                    if (tabuleiro[parseInt(x)].GetSource()===tabuleiro[parseInt(x)+contador].GetSource()){
                        contador=contador+1;
                        passo=passo+1;
                    }
                    else{
                        passo=9;
                    }
                }
                if(contador>=3){
                    valor=true;
                    alert("Alinhaste joias seguidas horizontalmente");
                    for(var line=0;line<contador;line++){
                        tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                        let numerorandom=Math.floor((Math.random()*7));
                        tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                        tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                        tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                        tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                        tabuleiro[parseInt(x)-40+line]=tabuleiro[parseInt(x)-48+line];
                        tabuleiro[parseInt(x)-48+line]=tabuleiro[parseInt(x)-56+line];
                        tabuleiro[parseInt(x)-56+line]=Joias[numerorandom];
                        var source=tabuleiro[parseInt(x)+line].GetSource();
                        var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                        var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                        var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                        var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                        var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                        var source7=tabuleiro[parseInt(x)-48+line].GetSource();
                        var source8=tabuleiro[parseInt(x)-56+line].GetSource();
                        document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                        document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                        document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                        document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                        document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                        document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
                        document.getElementById("cell"+((parseInt(x)-48+line+1).toString())).style.backgroundImage="url("+source7+")";
                        document.getElementById("cell"+((parseInt(x)-56+line+1).toString())).style.backgroundImage="url("+source8+")";

                    }
                    pontuação=pontuação+((contador-3)+1);
                    JoiasEliminadas=JoiasEliminadas+contador;
                    JoiasRestantes=JoiasRestantes-contador;
                    if(JoiasEliminadas<=20){
                        VerificaJoiasHorizontalJogada(Joias,tabuleiro); 
                    }
                    break;
                    
                }
            }
            else if(parseInt(x)===60){
                
                
                let passo =1;
                let contador=1;
                while(passo<=3){
                    if (tabuleiro[parseInt(x)].GetSource()===tabuleiro[parseInt(x)+contador].GetSource()){
                        contador=contador+1;
                        passo=passo+1;
                    }
                    else{
                        passo=9;
                    }
                }
                if(contador>=3){
                    valor=true;
                    alert("Alinhaste joias seguidas horizontalmente");
                    for(var line=0;line<contador;line++){
                        tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                        let numerorandom=Math.floor((Math.random()*7));
                        tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                        tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                        tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                        tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                        tabuleiro[parseInt(x)-40+line]=tabuleiro[parseInt(x)-48+line];
                        tabuleiro[parseInt(x)-48+line]=tabuleiro[parseInt(x)-56+line];
                        tabuleiro[parseInt(x)-56+line]=Joias[numerorandom];
                        var source=tabuleiro[parseInt(x)+line].GetSource();
                        var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                        var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                        var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                        var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                        var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                        var source7=tabuleiro[parseInt(x)-48+line].GetSource();
                        var source8=tabuleiro[parseInt(x)-56+line].GetSource();
                        document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                        document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                        document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                        document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                        document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                        document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
                        document.getElementById("cell"+((parseInt(x)-48+line+1).toString())).style.backgroundImage="url("+source7+")";
                        document.getElementById("cell"+((parseInt(x)-56+line+1).toString())).style.backgroundImage="url("+source8+")";

                    }
                    pontuação=pontuação+((contador-3)+1);
                    JoiasEliminadas=JoiasEliminadas+contador;
                    JoiasRestantes=JoiasRestantes-contador;
                    
                    if(JoiasEliminadas<=20){
                        VerificaJoiasHorizontalJogada(Joias,tabuleiro); 
                    }
                    break;
                    
                }
            }
            else if(parseInt(x)===61){
                
                
                let passo =1;
                let contador=1;
                while(passo<=2){
                    if (tabuleiro[parseInt(x)].GetSource()===tabuleiro[parseInt(x)+contador].GetSource()){
                        contador=contador+1;
                        passo=passo+1;
                    }
                    else{
                        passo=9;
                    }
                }
                if(contador>=3){
                    valor=true;
                    alert("Alinhaste joias seguidas horizontalmente");
                    for(var line=0;line<contador;line++){
                        tabuleiro[parseInt(x)+line]=tabuleiro[parseInt(x)-8+line];
                        let numerorandom=Math.floor((Math.random()*7));
                        tabuleiro[parseInt(x)-8+line]=tabuleiro[parseInt(x)-16+line];
                        tabuleiro[parseInt(x)-16+line]=tabuleiro[parseInt(x)-24+line];
                        tabuleiro[parseInt(x)-24+line]=tabuleiro[parseInt(x)-32+line];
                        tabuleiro[parseInt(x)-32+line]=tabuleiro[parseInt(x)-40+line];
                        tabuleiro[parseInt(x)-40+line]=tabuleiro[parseInt(x)-48+line];
                        tabuleiro[parseInt(x)-48+line]=tabuleiro[parseInt(x)-56+line];
                        tabuleiro[parseInt(x)-56+line]=Joias[numerorandom];
                        var source=tabuleiro[parseInt(x)+line].GetSource();
                        var source2=tabuleiro[parseInt(x)-8+line].GetSource();
                        var source3=tabuleiro[parseInt(x)-16+line].GetSource();
                        var source4=tabuleiro[parseInt(x)-24+line].GetSource();
                        var source5=tabuleiro[parseInt(x)-32+line].GetSource();
                        var source6=tabuleiro[parseInt(x)-40+line].GetSource();
                        var source7=tabuleiro[parseInt(x)-48+line].GetSource();
                        var source8=tabuleiro[parseInt(x)-56+line].GetSource();
                        document.getElementById("cell"+((parseInt(x)+line+1).toString())).style.backgroundImage="url("+source+")";
                        document.getElementById("cell"+((parseInt(x)-8+line+1).toString())).style.backgroundImage="url("+source2+")";
                        document.getElementById("cell"+((parseInt(x)-16+line+1).toString())).style.backgroundImage="url("+source3+")";
                        document.getElementById("cell"+((parseInt(x)-24+line+1).toString())).style.backgroundImage="url("+source4+")";
                        document.getElementById("cell"+((parseInt(x)-32+line+1).toString())).style.backgroundImage="url("+source5+")";
                        document.getElementById("cell"+((parseInt(x)-40+line+1).toString())).style.backgroundImage="url("+source6+")";
                        document.getElementById("cell"+((parseInt(x)-48+line+1).toString())).style.backgroundImage="url("+source7+")";
                        document.getElementById("cell"+((parseInt(x)-56+line+1).toString())).style.backgroundImage="url("+source8+")";

                    }
                    pontuação=pontuação+((contador-3)+1);
                    JoiasEliminadas=JoiasEliminadas+contador;
                    JoiasRestantes=JoiasRestantes-contador;
                    if(JoiasEliminadas<=20){
                        VerificaJoiasHorizontalJogada(Joias,tabuleiro); 
                    }
                    
                    break;
                    
                }
            }
            
            
                



            

        }
    MostrarPontuaçãoJogo();
    MostraJoiasEliminadas();
    MostraJoiasRestantes();
    

    if (JoiasEliminadas>=20){
        terminaJogo(JoiasEliminadas);
        
    }


    return valor;

}


// Mais Variáveis Globais

const SPAN_TEMPO_JOGO ="spanTempoJogo";
const BOTAO_INICIA_JOGO="btnIniciaJogo";
const BOTAO_CANCELA_JOGO="BtnCancelaJogo";
const SPAN_PONTUAÇÃO_JOGO="spanPontuaçãoJogo";
const SPAN_JOIAS_ELIMINADAS="spanJoiasEliminadas";
const SPAN_JOIAS_RESTANTES="spanJoiasRestantes";

let jogo={
    inicio:null,
    stats:null
};

let pontuação=0;
let temporizadorTempoJogo=1;


function mostrarTempoJogo(){
    let x =(Math.floor(Date.now()/1000)-jogo.inicio)
    document.getElementById(SPAN_TEMPO_JOGO).innerHTML="Tempo Decorrido :\n"+x;
}

let JoiasRestantes= 20;

function MostraJoiasRestantes(){
    let x = 20 - (parseInt(JoiasEliminadas));
    document.getElementById(SPAN_JOIAS_RESTANTES).innerHTML = "Falta eliminar "+ x.toString()+" joias!" 
}

let JoiasEliminadas=0;

function MostraJoiasEliminadas(){
    let x = JoiasEliminadas;
    document.getElementById(SPAN_JOIAS_ELIMINADAS).innerHTML= "Já eliminaste "+ x.toString()

}

function MostrarPontuaçãoJogo(){
    document.getElementById(SPAN_PONTUAÇÃO_JOGO).innerHTML="Pontuação :\n"+pontuação;
}

let myTimeout=null;

var flag=true;

// Quando o utilizador clica para começar um jogo
function IniciaJogo(){
    
    document.getElementById("board").style.display= "grid";


    
    if( document.getElementById("li3").innerText !== "Sign Up"){
        document.getElementById("btniniciajogo").disabled = true;
        document.getElementById("btniniciajogo").style.display = "none";
        document.getElementById("btncancelajogo").disabled = false;
        document.getElementById("btncancelajogo").style.display = "block";
        JoiasRandom(joias,tabuleiro);
        

        
        pontuação=0;
        JoiasEliminadas=0;
        JoiasRestantes=20;

        
        jogo.stats=[];
        jogo.inicio=Math.floor(Date.now()/1000);
        temporizadorTempoJogo = setInterval(mostrarTempoJogo, 1000);
        MostraJoiasRestantes();
        MostraJoiasEliminadas();
        MostrarPontuaçãoJogo();

    }
    else{
        alert("Tens de iniciar sessão!");
    }
    
    

}


//  Quando o utilizador clica no botão para terminar jogo
function cancelaJogo(){
    
    terminaJogo(JoiasEliminadas);
  
}


// Quando o jogo termina pois o utilizador eliminou as 20 joias
function terminaJogo(resultado){

    document.getElementById("btncancelajogo").disabled = true;
    document.getElementById("btncancelajogo").style.display = "none";
    document.getElementById("board").style.display= "none";

    if (resultado>=20){
        
        alert("Conseguiste alcançar a meta das 20 joias eliminadas!");
    }
    else{
        alert("Não conseguiste alcançar a meta das 20 joias eliminadas!");
    }
    
    let nomeutilizador= document.getElementById("li3").innerText;
    let teste = document.getElementById(SPAN_TEMPO_JOGO).innerText
    let duração = parseInt(teste.substring(18,));

    jogo.stats.push([nomeutilizador,pontuação,duração]);
    let resultadojogo=[nomeutilizador,pontuação,duração];
    clearInterval(temporizadorTempoJogo);

    // adiciona o resultado no histórico
    gravaResultadoHistorico(resultadojogo);
    

}


//função para dar sort à tabela das classificações por pontuação e duração .
function sortFunction(a,b){
    if(a>b){
        return 1;
    }
    if(a<b){
        return-1;
    }
    return 0;


}

// Mais Variáveis Globais
let resultados_jogo=[];
const ITEM_RESULTADOS="resultados";



function gravaResultadoHistorico(resultado){
    
    

    resultados_jogo.push(resultado);
    
    
    var nota= resultados_jogo.length;

    for(let i=1 ; i<nota;i++){
        if(resultados_jogo[nota-1][0]===resultados_jogo[nota-1-i][0] && resultados_jogo[nota-1][1]===resultados_jogo[nota-1-i][1] && resultados_jogo[nota-1][2]===resultados_jogo[nota-1-i][2]){
            resultados_jogo.splice(nota-1-i,1);
            
            

        }
        
    }

    

    resultados_jogo.sort(function(a,b){
        return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : a[2]<b[2] ? -1 : a[2]>b[2] ? 1 : 0  ;
    });
    
    //Guarda em LocalStorage
    gravaHistoricoResultados();

    if(flag===true){
        let btnjogaragain= document.createElement("button");
        btnjogaragain.id="btnjogaragain";
        btnjogaragain.innerHTML= "Jogar outra vez";


        let tabela_classificações= document.createElement("table");
        tabela_classificações.className= "modal-content";
        tabela_classificações.id="tabela_classificações";
    

        tabela_classificações.innerHTML='<span onclick=document.getElementById("tabela_classificações").style.display="none" class="close" id="close-signup" title="Close Modal">&times;</span>'+ 
                                        "<tr>"+
                                            '<th class="th-classificações" scope="col">Nome</th>'+
                                            '<th class="th-classificações" scope="col">Pontuação</th>'+
                                            '<th class="th-classificações" scope="col">Duração</th>'+
                                        "</tr>"+
                                        "<tr>"+
                                            '<td id="nome1">Nome1</td>'+
                                            '<td id="pontuação1">Pontuação</td>'+
                                            '<td id="duração1">Pontuação</td>'+


                                        "</tr>"+
                                        "<tr>"+
                                                '<td id="nome2">Nome2</td>'+
                                                '<td id="pontuação2">Pontuação</td>'+
                                                '<td id="duração2">Pontuação</td>'+

                                        "</tr>"+
                                        "<tr>"+
                                            '<td id="nome3">Nome3</td>'+
                                            '<td id="pontuação3">Pontuação</td>'+
                                            '<td id="duração3">Pontuação</td>'+

                                        "</tr>"+
                                        "<tr>"+
                                            '<td id="nome4">Nome4</td>'+
                                            '<td id="pontuação4">Pontuação</td>'+
                                            '<td id="duração4">Pontuação</td>'+

                                        "</tr>"+
                                        "<tr>"+
                                            '<td id="nome5">Nome5</td>'+
                                            '<td id="pontuação5">Pontuação</td>'+
                                            '<td id="duração5">Pontuação</td>'+

                                        '</tr>'+
                                        '<tr>'+
                                            '<td id="nome6">Nome6</td>'+
                                            '<td id="pontuação6">Pontuação</td>'+
                                            '<td id="duração6">Pontuação</td>'+

                                        '</tr>'+
                                        '<tr>'+
                                            '<td id="nome7">Nome7</td>'+
                                            '<td id="pontuação7">Pontuação</td>'+
                                            '<td id="duração7">Pontuação</td>'+

                                        '</tr>'+
                                        '<tr>'+
                                            '<td id="nome8">Nome8</td>'+
                                            '<td id="pontuação8">Pontuação</td>'+
                                            '<td id="duração8">Pontuação</td>'+

                                        '</tr>'+
                                        '<tr>'+
                                            '<td id="nome9">Nome9</td>'+
                                            '<td id="pontuação9">Pontuação</td>'+
                                            '<td id="duração9">Pontuação</td>'+

                                        '</tr>'+
                                        '<tr>'+
                                            '<td id="nome10">Nome10</td>'+
                                            '<td id="pontuação10">Pontuação</td>'+
                                            '<td id="duração10">Pontuação</td>'+

                                        "</tr>";
        
        
        
        document.getElementById("show").appendChild(tabela_classificações);
        
        //Atualiza a tabela das classificações 
        AtualizaClassificações();

        document.getElementById("botões-jogar").appendChild(btnjogaragain);

        document.getElementById("btnjogaragain").onclick = Mix;

    }
    else{
        document.getElementById("tabela_classificações").style.display="table";
        //Atualiza a tabela das classificações 
        AtualizaClassificações();

    }
    
}

//Cria a tabela com as estatísticas do jogador e mete o volume do audio com valor 0.05
function CriaEstatisticaJogador(){
    let tabela_estatistica= document.createElement("table");
        tabela_estatistica.className= "modal-content";
        tabela_estatistica.id="tabela_estatisticas";
        tabela_estatistica.innerHTML= '<span onclick=document.getElementById("tabela_estatisticas").style.display="none" class="close" id="close-esta" title="Close Modal">&times;</span>'+
                                        "<tr>"+
                                            '<th class="th-classificações" scope="col">Número de jogos jogados</th>'+
                                            '<th class="th-classificações" scope="col">Tempo total de jogo</th>'+
                                            '<th class="th-classificações" scope="col">Melhor Pontuação</th>'+
                                        "</tr>"+
                                        "<tr>"+
                                            '<td id="jogos1">Jogos</td>'+
                                            '<td id="tempo1">Tempo</td>'+
                                            '<td id="melhorpontuação1"> Melhor Pontuação</td>'+


                                        "</tr>";
    document.getElementById("show").appendChild(tabela_estatistica);
    
    document.getElementById("tabela_estatisticas").style.display="none";
    document.getElementById("btncancelajogo").style.display="none";
    var audio= document.getElementById("audio");
    audio.volume = 0.05;
    
}


function MostraEstatisticaJogador(){
    AtualizaEstatisticas();
    document.getElementById("tabela_estatisticas").style.display="table";
}


function AtualizaEstatisticas(){
    let contador=0;
    let tempojogo=0;
    let melhorpontuação=0;
    for (let i in resultados_jogo){
        if((document.getElementById("li3").innerText) === resultados_jogo[i][0]){
            contador=contador+1;
            tempojogo=tempojogo+resultados_jogo[i][2];
            melhorpontuação=max(melhorpontuação,resultados_jogo[i][1]);

        }
    }
    document.getElementById("jogos1").innerHTML=contador;
    document.getElementById("tempo1").innerHTML=tempojogo;
    document.getElementById("melhorpontuação1").innerHTML=melhorpontuação;


}

//função que devolve o valor máximo.
function max (a,b){
    if(a>b){
        return a;
    }
    else{
        return b;
    }
}


function Mix(){
    flag=false;
    document.getElementById("tabela_classificações").style.display="none";
    IniciaJogo();

}

function gravaHistoricoResultados(){
    localStorage.setItem(ITEM_RESULTADOS, JSON.stringify(resultados_jogo));
}

function carregaResultados(){
    resultados_jogo = JSON.parse(localStorage.getItem(ITEM_RESULTADOS)) || [];

}



// função que devolve o mínimo
function min(a,b){
    if(a<b){
        return a;
    }
    else{
        return b;
    }
}


function AtualizaClassificações(){

    for(let i=1; i<=min(10,resultados_jogo.length);i++){
        
        document.getElementById("nome"+i.toString()).innerHTML=resultados_jogo[i-1][0];
        document.getElementById("pontuação"+i.toString()).innerHTML=resultados_jogo[i-1][1];
        document.getElementById("duração"+i.toString()).innerHTML=(resultados_jogo[i-1][2].toString())+ " segundos";

    }
    
}





