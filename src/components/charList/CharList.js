import React, {useState, useEffect, useRef} from "react";
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types";

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError)
    }

    const onCharListLoading = () => {
       setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setLoading(false)
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === '' || e.key === 'Enter') {
                            props.onCharSelected(item.id)
                            focusOnItem(i)
                        }
                    }}
                    >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}

            <button className="button button__main button__long">
                <div
                    className="inner"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'} }
                //    style={{'visibility': charEnded ? 'hidden' : 'visible'} }
                    onClick={() => onRequest(offset)}

                >load more</div>
            </button>

        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;

// <div className="char__list">
//     <ul className="char__grid">
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item char__item_selected">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//             <img src={abyss} alt="abyss"/>
//             <div className="char__name">Abyss</div>
//         </li>
//     </ul>
//     <button className="button button__main button__long">
//         <div className="inner">load more</div>
//     </button>
// </div>

//===============================================================CLASS
// class CharList extends Component {
//
//     state = {
//         charList: [],
//         loading: true,
//         error: false,
//         newItemLoading: false,
//         offset: 210,
//         charEnded: false
//     }
//
//     myRef = React.createRef()
//
//     marvelService = new MarvelService();
//
//     componentDidMount() {
//         this.onRequest()
//         // this.marvelService.getAllCharacters()
//         //     .then(this.onCharListLoaded)
//         //     .catch(this.onError)
//     }
//
//     onRequest = (offset) => {
//         this.onCharListLoading()
//
//         this.marvelService.getAllCharacters(offset)
//             .then(this.onCharListLoaded)
//             .catch(this.onError)
//     }
//
//     onCharListLoading = () => {
//         this.setState({
//             newItemLoading: true
//         })
//     }
//
//     onCharListLoaded = (newCharList) => {
//         let ended = false
//         if (newCharList.length < 9) {
//             ended = true
//         }
//
//         this.setState(({offset, charList}) => ({
//             charList: [...charList, ...newCharList],
//             loading: false,
//             newItemLoading: false,
//             offset: offset + 9,
//             charEnded: ended
//         }) )
//     }
//
//     onError = () => {
//         this.setState({
//             error: true,
//             loading: false
//         })
//     }
//
//     // Этот метод создан для оптимизации,
//     // чтобы не помещать такую конструкцию в метод render
//     renderItems(arr) {
//         const items =  arr.map((item) => {
//             let imgStyle = {'objectFit' : 'cover'};
//             if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                 imgStyle = {'objectFit' : 'unset'};
//             }
//
//             return (
//                 <li
//                     className="char__item"
//                     key={item.id}
//                     onClick={() => this.props.onCharSelected(item.id)}>
//                     <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
//                     <div className="char__name">{item.name}</div>
//                 </li>
//             )
//         });
//         // А эта конструкция вынесена для центровки спиннера/ошибки
//         return (
//             <ul className="char__grid">
//                 {items}
//             </ul>
//         )
//     }
//
//     render() {
//
//         const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
//         const items = this.renderItems(charList);
//
//         const errorMessage = error ? <ErrorMessage /> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? items : null;
//
//         return (
//             <div className="char__list">
//                 {errorMessage}
//                 {spinner}
//                 {content}
//
//                 <button className="button button__main button__long">
//                     <div
//                         className="inner"
//                         disabled={newItemLoading}
//                         style={{'display': charEnded ? 'none' : 'block'} }
//                         //    style={{'visibility': charEnded ? 'hidden' : 'visible'} }
//                         onClick={() => this.onRequest(offset)}
//
//                     >load more</div>
//                 </button>
//
//             </div>
//         )
//     }
// }