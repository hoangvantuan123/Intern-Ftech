import Link from "next/link";

async function fetchRepos() {
  const reponse = await fetch(
    "https://api.github.com/users/bradtraversy/repos"
  );
  const repos = await reponse.json();
  return repos;
}

const ReposPage = async () => {
  const repos = await fetchRepos();
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Danh sách bài viết</h1>
        <ul>
          {repos.map((post) => (
            <li key={post.id} className="mb-4 p-4 border border-gray-300 rounded-lg shadow">
              <Link href={`code/repos/${post.name}`}>
               
                  <h3 className="text-xl font-bold mb-2">{post.name}</h3>
              </Link>
              
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReposPage;
