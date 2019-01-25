package ar.edu.itba.paw.persistence;

import javax.sql.DataSource;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.jdbc.JdbcTestUtils;
import org.springframework.transaction.annotation.Transactional;

import ar.edu.itba.paw.model.User;

@Sql("classpath:schema.sql")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
@Transactional
public class UserJdbcDaoTest {
	
	@Autowired
	private DataSource ds;
	
	@Autowired
	private UserJdbcDao userDao;

	private JdbcTemplate jdbcTemplate;

	@Before
	public void setUp() {
		jdbcTemplate = new JdbcTemplate(ds);
	}
	
	private static final String USERNAME = "test_username";
	private static final String PASSWORD = "test_password";
	
	@Test
	public void testCreate() {
		JdbcTestUtils.deleteFromTables(jdbcTemplate,"users");
		final User user = userDao.create(USERNAME, PASSWORD);
		Assert.assertNotNull(user);
		Assert.assertEquals(USERNAME, user.getUsername());
		Assert.assertEquals(PASSWORD, user.getPassword());
		Assert.assertEquals(1, JdbcTestUtils.countRowsInTable(jdbcTemplate, "users"));
	}

}
