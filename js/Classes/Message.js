class Message {
    message(block, message, addRemoveClass) {
        block.textContent = message;
        block.style.visibility = 'visible';
        block.classList.add(addRemoveClass);
        setTimeout(() => {
            block.textContent = '';
            block.style.visibility = 'hidden';
            block.classList.remove(addRemoveClass);
        }, 3000);
    }
}