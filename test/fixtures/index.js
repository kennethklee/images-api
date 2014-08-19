var fixtures = require('node-mongoose-fixtures');

fixtures.save('snapshots', {
    snapshots: [
        {
            _id: 'test-image-1',
            public_id: 'photo1'
        },
        {
            _id: 'test-image-2',
            public_id: 'photo2'
        },
        {
            _id: 'test-image-3',
            public_id: 'photo3'
        },
        {
            _id: 'test-image-4',
            public_id: 'photo4'
        }
    ]
});
