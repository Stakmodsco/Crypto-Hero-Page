class CardCarousel {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.init();
    }
    init() {
        this.updateCardPositions();
        this.startAutoRotation();
        this.addCardClick();
    }
    updateCardPositions() {
        this.cards.forEach((card,index)=>{
            card.classList.remove('active','next','prev','hidden');
            if(index===this.currentIndex){ card.classList.add('active'); }
            else if(index===(this.currentIndex+1)%this.cards.length){ card.classList.add('next'); }
            else if(index===(this.currentIndex-1+this.cards.length)%this.cards.length){ card.classList.add('prev'); }
            else{ card.classList.add('hidden'); }
        });
    }
    nextCard() {
        if(this.isAnimating) return;
        this.isAnimating=true;
        this.currentIndex=(this.currentIndex+1)%this.cards.length;
        this.updateCardPositions();
        setTimeout(()=>{ this.isAnimating=false; },600);
    }
    startAutoRotation() {
        setInterval(()=>{ this.nextCard(); },3000);
    }
    addCardClick() {
        this.cards.forEach((card,i)=>{
            card.addEventListener('click',()=>{
                if(i!==this.currentIndex) this.currentIndex=i;
                this.updateCardPositions();
            });
            card.addEventListener('mousemove',(e)=>{
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width/2;
                const y = e.clientY - rect.top - rect.height/2;
                card.style.transform=`rotateY(${x/10}deg) rotateX(${-y/10}deg) scale(1.05)`;
            });
            card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
        });
    }
}

document.addEventListener('DOMContentLoaded',()=>{ new CardCarousel(); });