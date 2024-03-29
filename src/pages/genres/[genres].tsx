import Layout from "../../Components/Layout/Layout";
import { getSession } from "next-auth/react";
import { getAllContentEndpoint, getCategories} from "../../http";
import { IConfigData, ISessionData } from "../_app";
import { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { IAllContentResponse } from "..";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";


const loadingData = new Array(20).fill(1)

interface ICategoryPageProps {
    config: IConfigData;
    userSession: ISessionData;
    query: {
        genres: string;
    }
}

const CategoryPage: NextPage<ICategoryPageProps> = ({ config, userSession, query }): JSX.Element => {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState<IAllContentResponse['data']>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [category, setCategory] = useState<{
        _id: string;
        name: string;
        slug: string;
        description: string;
    }>();
    // generate href for slider
    const generateUrl = (item: any) => {
        const type = item.type.toLowerCase();
        const slug = item.slug;
        const url = `/${type}/${slug}`;
        return url;
    }

    // handleSliderClick
    const handleSliderClick = (item: any, reload?: boolean) => {
        const url = generateUrl(item);
        if (reload) {
            router.push(url).then(() => router.reload())
        } else {
            router.replace(url)
        }
    }

    const getDataByCategory = async (category: string, page: number) => {

        try {
            const { data, status } = await getAllContentEndpoint(`page=${page}&limit=25&sort=desc&category_id=${category}`);
            if (status === 200) {
                // copy all data 
                setCategoryData([...categoryData, ...data.data])
                setLoading(false);
            }
        } catch (error) {
            setCategoryData([]);
            setLoading(false);
        }
    }

    const getDataByCategoryQuery = async (category: string, page: number) => {

        try {
            const { data, status } = await getAllContentEndpoint(`page=${page}&limit=25&sort=desc&category_id=${category}`);
            if (status === 200) {
                // copy all data 
                setCategoryData(data.data)
                setLoading(false);
            }
        } catch (error) {
            setCategoryData([]);
            setLoading(false);
        }
    }

    const getCategoriesFunc = async () => {
        try {
            const { data, status } = await getCategories(`id=${query.genres}`);
            if (status === 200) {
                setCategory(data.data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataByCategory(query.genres, page);
        getCategoriesFunc();
        return () => {
            setCategoryData([]);
            setPage(1);
            setCategory(undefined);
        }
    }, []);

    useEffect(() => {
        getDataByCategoryQuery(query.genres, 1);
        getCategoriesFunc();
        return () => {
            setCategoryData([]);
            setPage(1);
            setCategory(undefined);
        }
    }, [query]);

    // get more data
    const getMoreData = async () => {
        setPage(page + 1)
        getDataByCategory(query.genres, page);
    }

    return (
        <Layout
            userSession={userSession}
            config={config.data || false}
        >
            <div className="w-[94%] mx-auto mt-10">
                <h1 className="text-2xl text-white font-semibold">
                    {
                        category && category.name
                    }
                </h1>
                <p className="mt-2 text-lg text-white">
                    {
                        category && category.description
                    }
                </p>
            </div>
            {/* <InfiniteScroll
                dataLength={categoryData.length}
                next={getMoreData}
                hasMore={true}
                loader={<h4></h4>}
            > */}
                  <div className="container m-auto my-4">
                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 mx-5 lg:mx-0'>
                        {
                            <>
                                {
                                    loading ? loadingData.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-1'>
                                        <div className='relative'>
                                            <div className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'>

                                            </div>
                                        </div>
                                    </div>
                                        )
                                    }) : categoryData && categoryData.length > 0 && categoryData.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-1'>
                                        <div className='hover:scale-110 duration-500'>
                                            <img
                                                onClick={() => handleSliderClick(item)}
                                                src={item.thumbnail}
                                                className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'
                                            />
                                        </div>
                                    </div>
                                        )
                                    })
                                }

                            </>
                        }
                    </div>
                </div>
            {/* </InfiniteScroll> */}
        </Layout>
    )
};

export default CategoryPage;


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const query = context.query;
    if (!session) {
        return {
            props: {
                userSession: null,
                query: query
            },
        };
    } else {
        return {
            props: {
                userSession: session,
                query: query
            },
        };
    }
}


