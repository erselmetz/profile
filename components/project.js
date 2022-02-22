let title = ''
let buildIn = ''
let demo = ''
let github = ''
let image =''
export default class ProjectBox extends HTMLElement{
    constructor(){
        super()
        title = this.getAttribute('title')
        buildIn = this.getAttribute('buildIn')
        demo = this.getAttribute('demo')
        github = this.getAttribute('github')
        image = this.getAttribute('image')
    }
    connectedCallback(){
        this.render()
    }
    template(){
        return `
        <div class="mt-4 p-4 border border-green-700 hover:border-blue-700 shadow-lg">
            <div class="container p-2">
                <h1 class="text-4xl md:text-6xl mb-2">${title}</h1>
                <p class="text-lg"><span class="font-bold">Build in :</span>${buildIn}</p>
                <p class="text-lg">
                    <span class="font-bold">Demo :</span>
                    <a target="_blank" href="${demo}" class="text-red-700 underline hover:text-blue-700">
                        ${demo}
                    </a>
                </p>
                <p class="text-lg">
                    <span class="font-bold">Github :</span> 
                    <a target="_blank" href="${github}" class="text-red-700 underline hover:text-blue-700">
                        ${github}
                    </a>
                </p>
                <img src="${image}" alt="" class="w-full">
            </div>
        </div>
        `
    }
    render(){
        this.innerHTML = this.template()
    }
}

customElements.define('project-box',ProjectBox)