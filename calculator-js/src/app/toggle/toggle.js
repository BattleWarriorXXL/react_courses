const Toggle = {
    init() {
        const toggle = document.querySelector(".toggle");
        const toggleItem = document.querySelector(".toggle-item");
        const body = document.body;
        
        toggle.addEventListener("click", function(){
            body.classList.toggle("active");
            toggleItem.classList.toggle("active");
        });
    }
};

export default Toggle;
