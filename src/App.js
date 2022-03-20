// import './App.css';
import Post from "./components/Post";
import posts from "./posts.json";
import {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {Container, Header, Button, Item, Segment, Dimmer, Loader} from 'semantic-ui-react'

class App extends Component {

    constructor(props) {
        super(props)
    }

    fetchPosts() {
        const { setPosts } = this.props
        axios.get('https://6234c0c2f8cc44202a8c4fc8.mockapi.io/posts').then(({ data }) => {
            setPosts(data)
        })
    }

    componentWillMount() {
        this.fetchPosts()
    }

    regionText(s) {
        switch (s) {
            case 'ING':
                return 'Новости 1'
            case 'DAG':
                return 'Новости 2'
            case 'CHE':
                return 'Новости 3'
            default:
        }
    }

    render() {
        const { posts } = this.props
        // const { items } = posts
        return (
            <Container>
                <Header as='h2'>Регион: {this.regionText(this.props.regions.region)}</Header>
                <Button.Group basic>
                    <Button onClick={this.props.changeRegion.bind(this, 'ING')}>One</Button>
                    <Button onClick={this.props.changeRegion.bind(this, 'DAG')}>Two</Button>
                    <Button onClick={this.props.changeRegion.bind(this, 'CHE')}>Three</Button>
                </Button.Group>
                <Item.Group divided>
                    {
                        !posts.length ? (
                            <Segment>
                                <br/>
                                <br/>
                                <br/>
                                <Dimmer active inverted>
                                    <Loader>Loading</Loader>
                                </Dimmer>
                            </Segment>
                        ) : (
                            posts.map((item, key) => {
                                return (
                                    <Post
                                        key={key}
                                        {...item}
                                    />
                                )
                            })
                        )
                    }
                </Item.Group>
            </Container>
        );
    }
}

// const mapStateToProps = (props) => {
//     return {
//         ...props,
//     }
// }
// сортировка по количеству просмотров
const mapStateToProps = ({ posts, regions }) => {
    const sortedPosts = posts.items.length ? posts.items.sort((a, b) => a.views - b.views).reverse() : []
    return {
        posts: sortedPosts,
        regions,
    }
}
const actions = (dispatch) => ({
    setPosts:     (data) => dispatch({
        type:    'SET_POSTS',
        payload: data,
    }),
    changeRegion: name => dispatch({
        type:    'CHANGE_REGION',
        payload: name,
    })
})

export default connect(mapStateToProps, actions)(App);
