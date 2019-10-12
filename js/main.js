$(document).ready(function () {

    /*Funciones*/
    const minifyContet = text => {
        let cantidadPermitida = 120
        let cadena

        if (text.length >= cantidadPermitida) {
            cadena = text.substring(0,cantidadPermitida)+'...'
            return cadena
        }else{
            return text
        }
        // console.log(text.substring(0,5))
        // console.log(text.length)
    }

    const mostrarPost = ({title,date,content}) => {
        let contenedorPosts = $('#posts')
        let post = `<article class="post">
                        <div class="post-data">
                            <h2>${title}</h2>
                            <span class="fecha">${date}</span>
                            <span class="coment">12</span>
                        </div>
                        <p>${minifyContet(content)}</p>
                        <a href="#" class="button-more">Leer mas</a>
                     </article>`;

        contenedorPosts.append(post)
    }

    const themeActual = () => {
        const theme = $('#theme')
        const theme_selected = localStorage.getItem('theme')
        theme.attr('href',`css/${theme_selected}.css`)
        activateTheme(theme_selected)
    }

    const changeTheme = style => {
        const theme = $('#theme')
        
        activateTheme(style)

        const style_defined = style

        if (localStorage) {
            localStorage.clear()
            localStorage.setItem('theme',style_defined)
        }

        theme.attr('href',`css/${style}.css`)
    }

    const activateTheme = style => {
        const theme_select = $(`#${style}`)
        const themes = $('.change-theme a')

        for (let index = 0; index < themes.length; index++) {
            themes.removeClass('active-theme')
        }
        theme_select.addClass('active-theme')
    }

    const saveDataForm = ({name,value}) => {
        if (value != '') {
            localStorage.setItem(name,value)
        }else{
            // let inputError = $(`#${name}`)

            // let alert = $('<div/>',{
            //     'class': 'alert-error'
            // }).append($('<p/>',{
            //     'text':'Entrada obligatoria'
            // }))
            // inputError.after(alert)
            Swal.fire({
                type:'error',
                title:'Oops',
                text:'No se puede enviar campos vacios'
            })
            console.log(`campo ${name} no puede estar vacio`)
        }
    }

    //slider 
    $('.bxslider').bxSlider({
        mode: 'fade',
        infiniteLoop: true,
        responsive: true,
        captions: true,
        pager: false,
        slideWidth: 1200
    })

    //posts
    var posts = [{
            title: 'Prueba de titulo 1',
            date: moment().format("D MMMM YYYY"),
            content: 'Lorem ipsum dolor.'
        },
        {
            title: 'Prueba de titulo 2',
            date: moment().format("D MMMM YYYY"),
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi nihil fugiat doloremque. Est iusto nam dolore omnis culpa. Quaerat sed voluptates dolores fugiat cupiditate tempore nihil neque itaque. Distinctio, praesentium.'
        },
        {
            title: 'Prueba de titulo 3',
            date: moment().format("D MMMM YYYY"),
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi nihil fugiat doloremque. Est iusto nam dolore omnis culpa. Quaerat sed voluptates dolores fugiat cupiditate tempore nihil neque itaque. Distinctio, praesentium.'
        },
        {
            title: 'Prueba de titulo 4',
            date: moment().format("D MMMM YYYY"),
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi nihil fugiat doloremque. Est iusto nam dolore omnis culpa. Quaerat sed voluptates dolores fugiat cupiditate tempore nihil neque itaque. Distinctio, praesentium.'
        },
        {
            title: 'Prueba de titulo 5',
            date: moment().format("D MMMM YYYY"),
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi nihil fugiat doloremque. Est iusto nam dolore omnis culpa. Quaerat sed voluptates dolores fugiat cupiditate tempore nihil neque itaque. Distinctio, praesentium.'
        },
    ]
    posts.map(item => mostrarPost(item))

    //click en ver mas...
    // $('.button-more').on('click',function (event) {
    //     event.preventDefault()
        
    //     let descpPost = $('.post p')

    // })

    //tema atual de la pagina
    themeActual()

    //cambiar el tema de la pagina
    $('.change-theme a').on('click', function (event) {
        let theme = event.delegateTarget.attributes.id.nodeValue
        changeTheme(theme)
    })

    //back to up
    $('.backtoup').fadeOut();
    $(this).scroll(function () {
		if ($(this).scrollTop() > 150) {
			$('.backtoup').fadeIn();
		}else{
			$('.backtoup').fadeOut();
		}
	});

	$('.backtoup').click(function () {
		$("html, body").animate({ scrollTop: 0 }, 800);
    	return false;
	});

    //login false
    $('#login form').on('submit', function (event) {
        event.preventDefault()
        let boxLogin = $('#login')
        const datas = $(this).serializeArray()

        datas.map(data => saveDataForm(data))
        // boxLogin.fadeOut()
    })
})