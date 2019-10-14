$(document).ready(function () {

    /**FUNCIONES**/

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

    const saveDataForm = ({nick,email,password}) => {
        let devolver = ''

        if (nick != '' && email != '' && password != '') {
           if (password.length <= 3) {
            Swal.fire({
                type:'error',
                title:'Oops',
                text:'La contra necesita mas caracteres'
            })
           }else{
               let saveDataUserStorage = {
                   'nick': nick,
                   'email': email
               }

               localStorage.setItem('dataUser',JSON.stringify(saveDataUserStorage))

               devolver = 'success'

               return devolver
           }
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

    const showDataUser = ({nick,email}) => {
        const boxDataUser = $('#data-user')
        const relleno = $('#relleno')
        const boxLogin = $('#login')

        if (nick != null && email != null) {
            console.log('tiene datos')
            relleno.fadeOut()
            boxDataUser.fadeIn()
            boxLogin.fadeOut()
        
            $('#data-user h3').append(nick)
            $('#data-user p').append(email)
        }else{
            console.log('no tiene datos')
        }

        
    }

    /**FIN FUNCIONES**/

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
    const boxDataUser = $('#data-user')
    let dataUser = JSON.parse(localStorage.getItem('dataUser'))
    boxDataUser.hide()
    
    if (dataUser != null) {
        showDataUser(dataUser)
    }

    $('#login form').on('submit', function (event) {
        event.preventDefault()
        const boxLogin = $('#login')
        const data = $(this).serializeArray()
        console.log(data)
        const datasUser = {
            'nick': data[0].value,
            'email':data[1].value,
            'password': data[2].value
        }

        const saveData = saveDataForm(datasUser)
        if (saveData == 'success') {
            boxLogin.fadeOut()

            let getDataUser = JSON.parse(localStorage.getItem('dataUser'))
            showDataUser(getDataUser)
        }
    })

    //cerrar sesion
    $('#cerra_sesion').on('click', function () {
        const boxLogin = $('#login')
        const boxDataUser = $('#data-user')
        const relleno = $('#relleno')
        const formLogin = $('#login form')

        localStorage.removeItem('dataUser')
        formLogin[0].reset()

        boxDataUser.fadeOut()
        boxLogin.fadeIn()
        relleno.fadeIn()
    })

    //acordeo
    if (this.location.href.indexOf('about') > -1) {
        $('#acordeon').accordion()
    }

    //reloj
    if (this.location.href.indexOf('reloj') > -1) {
        setInterval(() => {
            let hora = moment().format('hh')
            let minutos = moment().format('mm')
            let segundos = moment().format('ss')

            $('#reloj #hora').html(hora)
            $('#reloj #minuto').html(minutos)
            $('#reloj #segundo').html(segundos)

        }, 1000);
    }

    //validacion de contacto
    if(this.location.href.indexOf('contact') > -1){
        $('#dataOfBirth').datepicker({
            dateFormat: 'dd/mm/yy'
        })
        $.validate({
            lang:'es',
            errorMessagePosition: 'top',
            scrollToTop:true
        })
    }

    
})