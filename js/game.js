
/* Game namespace */
var game = {

    // an object where to store game information
    data : { },

    // Run on page load.
    onload : function () {
        // Initialize the video.
        var scale = 3 * window.devicePixelRatio;
        if (!me.video.init(160, 144, { wrapper : 'screen', scale : scale })) {
            alert('Your browser does not support HTML5 canvas.');
            return;
        }

        // Initialize the audio.
        me.audio.init('mp3,ogg');

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    loaded : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register('player', game.PlayerEntity);
        me.pool.register('ball', game.BallEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.UP, 'jump', true);
        me.input.bindKey(me.input.KEY.A, 'kick', true);
        // added for debug purposes
        me.input.bindKey(me.input.KEY.E, 'debug', true);

        // sets global gravity
        me.sys.gravity = 0.7;

        // starts the game.
        me.state.change(me.state.PLAY);
    }
};
