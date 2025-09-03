const display = document.getElementById('display');

const isAllowed = s => /^[0-9+\-*/().\s]+$/.test(s);

function setDisplay(val){
  display.value = val;
}

function append(ch){
  if(display.value === '0' && /[0-9.]/.test(ch)){
    setDisplay(ch);
  } else {
    setDisplay(display.value + ch);
  }
}

function evaluateExpr(){
  const expr = display.value;
  if(!isAllowed(expr)) return;
  try{
    // eslint-disable-next-line no-new-func
    const result = Function('return (' + expr + ')')();
    if (typeof result === 'number' && isFinite(result)){
      setDisplay(String(result));
    }
  }catch(e){
    setDisplay('Error');
    setTimeout(()=>setDisplay('0'), 900);
  }
}

document.addEventListener('click', (e)=>{
  const t = e.target;
  if(t.dataset.val) append(t.dataset.val);
  if(t.dataset.op) append(t.dataset.op);
  if(t.dataset.act === 'clear') setDisplay('0');
  if(t.dataset.act === 'eq') evaluateExpr();
});

document.addEventListener('keydown',(e)=>{
  const k = e.key;
  if((/^[0-9+\-*/().]$/).test(k)){ append(k); }
  if(k === 'Enter'){ e.preventDefault(); evaluateExpr(); }
  if(k === 'Backspace'){
    if(display.value.length <= 1){ setDisplay('0'); }
    else{ setDisplay(display.value.slice(0,-1)); }
  }
});
