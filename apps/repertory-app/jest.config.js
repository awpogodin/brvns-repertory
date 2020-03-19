module.exports = {
  name: 'repertory-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/repertory-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
