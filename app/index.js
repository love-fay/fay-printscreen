import React from 'react';
import {render} from 'react-dom';
import Root from './root';
import Provider from '@fay-react/lib/provider';

document.title = 'Fay Printscreen';

render(<Provider root={Root}/>, document.getElementById('app'));